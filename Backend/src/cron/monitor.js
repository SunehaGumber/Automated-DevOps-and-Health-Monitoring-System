import cron from "node-cron";
import axios from "axios";
import serverModel from "../models/server.model.js";
import logModel from "../models/log.model.js";
import { serverDown, serverUp } from "../utils/email.utils.js";
import sendEmail from "../services/email.service.js";
import { getIO } from "../socket/socket.js";
import incidentModel from "../models/incident.model.js";
let isRunning = false;
const checkServerHealth = async (url, retries = 2) => {
  let lastError;

  for (let i = 0; i <= retries; i++) {
    const startTime = Date.now();
    try {
      await axios.get(url, { timeout: 5000 });
      return {
        status: "up",
        responseTime: Date.now() - startTime,
      };
    } catch (err) {
      lastError = err;
      await new Promise((res) => setTimeout(res, 1000));
    }
  }
  return {
    status: "down",
    responseTime: 0,
    error: lastError,
  };
};
export const runHealthCheck = async () => {
  if (isRunning) {
    console.log("Skipping overlapping cron");
    return;
  }

  isRunning = true;

  try {
    const io = getIO();
    console.log("Cron-job: Running health check", Date.now());

    const servers = await serverModel.find({}).populate("user");

    for (const server of servers) {
      const result = await checkServerHealth(server.url);

      const previousStatus = server.status;
      const currentStatus = result.status;
      const responseTime = result.responseTime;
      const isTransition = previousStatus !== currentStatus;
      const userEmail = server.user?.email;

      // ensure safe default
      const openIncident = await incidentModel.findOne({
        server: server._id,
        status: "open",
      });

      server.status = currentStatus;
      server.responseTime = responseTime;
      server.lastChecked = new Date();
      await server.save();

      if (isTransition && currentStatus === "down" ) {
        if (!openIncident) {
          const incident=await incidentModel.create({
            server: server._id,
            status: "open",
            startedAt: new Date(),
          });

          if (userEmail) {
            sendEmail(
              userEmail,
              `🚨 ${server.name} is DOWN`,
              `🚨 ${server.name} is DOWN`,
              serverDown(new Date(), server.name, server.url),
            ).catch(console.error);
          }
            io.emit("incident-created", incident);
        }
      }

      if (isTransition && currentStatus === "up") {
        if (openIncident) {
          openIncident.status = "closed";
          openIncident.resolvedAt = new Date();
          openIncident.duration =
          openIncident.resolvedAt - openIncident.startedAt;

          await openIncident.save();

          if (userEmail) {
            sendEmail(
              userEmail,
              `✅ ${server.name} is UP`,
               `✅ ${server.name} is UP`,
              serverUp(new Date(), server.name, server.url),
            ).catch(console.error);
          }
            io.emit("incident-resolved", openIncident);
        }
      }
    
      const newLog = await logModel.create({
        server: server._id,
        user: server.user?._id,
        lastChecked: server.lastChecked,
        status: server.status,
        responseTime: server.responseTime,
        url: server.url,
      });

      io.emit("server-status-update", {
        serverId: server._id,
        status: server.status,
        responseTime: server.responseTime,
        lastChecked: server.lastChecked,
      });

      io.emit("new-log", newLog);
    }
  } catch (err) {
    console.error("Cron Job Error:", err);
  } finally {
    isRunning = false;
  }
};
export const checkParticularServer = async (id, user) => {
  try {
    const server = await serverModel.findOne({ _id: id, user: user._id });
    if (!server) return null;

    const startTime = Date.now();
    try {
      await axios.get(server.url, { timeout: 5000 });
      server.status = "up";
      server.responseTime = Date.now() - startTime;
    } catch (err) {
      server.status = "down";
      server.responseTime = 0;
    }
    server.lastChecked = new Date();
    await server.save();

    // ADDED: Create log even for single server manual refresh
    await logModel.create({
      server: server._id,
      user: server.user,
      lastChecked: server.lastChecked,
      status: server.status,
      responseTime: server.responseTime,
      url: server.url,
    });

    return server;
  } catch (err) {
    console.error("Manual Check Error:", err);
    throw err;
  }
};

export const allServersOfUser = async (user) => {
  try {
    const servers = await serverModel.find({ user: user._id });
    if (servers.length === 0) return [];

    const checkPromises = servers.map(async (server) => {
      const startTime = Date.now();
      try {
        await axios.get(server.url, { timeout: 5000 });
        server.status = "up";
        server.responseTime = Date.now() - startTime;
      } catch (err) {
        server.status = "down";
        server.responseTime = 0;
      }
      server.lastChecked = new Date();

      return Promise.all([
        server.save(),
        logModel.create({
          server: server._id,
          user: server.user,
          lastChecked: server.lastChecked,
          status: server.status,
          responseTime: server.responseTime,
          url: server.url,
        }),
      ]);
    });

    await Promise.all(checkPromises);
    return servers;
  } catch (err) {
    console.error("All Servers Refresh Error:", err);
    throw err;
  }
};

export const initCron = () => {
  console.log("CRON initialized");
  cron.schedule("*/2 * * * *", runHealthCheck);
};
