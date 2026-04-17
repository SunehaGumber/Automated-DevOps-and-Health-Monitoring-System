import serverModel from "../models/server.model.js";
import { checkParticularServer } from "../cron/monitor.js";
import { allServersOfUser } from "../cron/monitor.js";
import logModel from "../models/log.model.js";

export async function createServer(req, res,next) {
  const user = req.user;
  const { name, url } = req.body;
  try {
    if (!name || !url) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }
    const isServerAlreadyRegistered = await serverModel.findOne({
      user: user._id,
      url,
    });
    if (isServerAlreadyRegistered) {
      return res.status(400).json({
        message: "Server already exists.",
      });
    }
    const server = await serverModel.create({
      name,
      url,
      user: user._id,
    });
    return res.status(201).json({
      message: "Server created successfully!",
      server: {
        user: user._id,
        name: server.name,
        url: server.url,
        status: server.status,
        lastChecked: server.lastChecked,
        responseTime: server.responseTime,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getServers(req, res,next) {
  const user = req.user;
  try {
    const servers = await serverModel.find({ user: user._id });
    if (servers.length == 0) {
      return res.status(200).json({
        message: "No servers listed for this particular user.",
      });
    }
    return res.status(200).json({
      message: "servers of this user fetched successfully!",
      servers,
    });
  } catch (err) {
    next(err);
  }
}

export async function fetchServer(req, res,next) {
  const id = req.params.id;
  const user = req.user;
  try {
    const server = await serverModel.findOne({
      _id: id,
      user: user._id,
    });
    if (!server) {
      return res.status(400).json({
        message: "Server don't exist.",
      });
    }

    return res.status(200).json({
      message: "Server details fetched successfully!",
      server,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateServer(req, res, next) {
  const id = req.params.id;
  const user = req.user;
  const { name, url } = req.body;

  try {
    // 1. Update the Server document
    const server = await serverModel.findOneAndUpdate(
      { _id: id, user: user._id },
      { name, url },
      { new: true, runValidators: true }
    );

    if (!server) {
      return res.status(404).json({ message: "Server not found or unauthorized" });
    }

    // 2. Since URL is stored in logs, we must update all associated logs
    // We only update the URL here because the name usually isn't in the log
    await logModel.updateMany(
      { server: id }, // Match all logs for this server
      { $set: { url: url } } // Update them with the new URL
    );

    return res.status(200).json({
      message: "Server and associated logs updated successfully!",
      server,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteServer(req, res, next) {
    const id = req.params.id;
    const user = req.user;

    try {
        // 1. Attempt to delete the server first
        const deletedServer = await serverModel.findOneAndDelete({
            _id: id,
            user: user._id
        });

        // 2. Check if the server actually existed/belonged to the user
        if (!deletedServer) {
            return res.status(404).json({
                message: "Server not found or unauthorized access."
            });
        }

        // 3. Since the server was successfully deleted, clean up its logs
        await logModel.deleteMany({
            server: id,
            user: user._id
        });

        return res.status(200).json({
            message: "Server and associated logs deleted successfully!"
        });
    } catch (err) {
        next(err);
    }
}

export async function checkServer(req, res,next) {
    const id = req.params.id;
  const user = req.user;

    try {
        const server = await checkParticularServer(id, user); 
        return res.status(200).json({
            message: "Server refreshed successfully!",
            server: {
                id: server._id,
                lastChecked: server.lastChecked,
                responseTime: server.responseTime,
                status: server.status,
                user: server.user,
                url:server.url
            }
        })
    } catch (err) {
      next(err);
    }

}

export async function refreshServers(req, res,next) {
  try {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "User not found in request. Check authMiddleware." });
    }

    const servers = await allServersOfUser(req.user);
    
    return res.status(200).json({ servers });

  } catch (err) {
    next(err);
  }
}
