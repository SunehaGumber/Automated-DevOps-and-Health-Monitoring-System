import cron from "node-cron";
import axios from "axios";
import serverModel from "../models/server.model.js";
import logModel from "../models/log.model.js";
import { serverDown } from "../utils/email.utils.js";
import sendEmail from "../services/email.service.js";
import { getIO } from "../socket/socket.js";

let isRunning = false;
export const runHealthCheck = async () => {
  if (isRunning) {
    console.log("Skipping overlapping cron");
    return;
  }

  isRunning = true;
  try {
    const io = getIO();
    console.log("Cron-job: Running 2-minute health check", Date.now());

    // Use populate to get user details for emails
    const servers = await serverModel.find({}).populate("user");

    for (let server of servers) {
      const startTime = Date.now();
      const previousStatus = server.status;
      let currentStatus = "up";
      let currentResponseTime = 0;

      try {
        await axios.get(server.url, { timeout: 8000 });
        currentResponseTime = Date.now() - startTime;
      } catch (error) {
        currentStatus = "down";
      }
      // Only send email if the status actually changed from UP to DOWN

      if (previousStatus !== currentStatus) {
        const html = serverDown(new Date(), server.name, server.url);
        if (server.user && server.user.email) {
          const isUp = currentStatus === "up";
          const subject = isUp
            ? `✅ Fixed: ${server.name} is UP`
            : `🚨 Alert: ${server.name} is DOWN`;
          const html = isUp
            ? serverUp(new Date(), server.name, server.url)
            : serverDown(new Date(), server.name, server.url);

          // Send the email (don't forget to use backticks for the subject template literal!)
          sendEmail(server.user.email, subject, subject, html).catch((err) =>
            console.error("Mail Error:", err),
          );
        }
      }

      // Update Server Document
      server.status = currentStatus;
      server.responseTime = currentResponseTime;
      server.lastChecked = new Date();
      await server.save();

      // Create History Log
      const newLog = await logModel.create({
        server: server._id,
        user: server.user ? server.user._id : null,
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
