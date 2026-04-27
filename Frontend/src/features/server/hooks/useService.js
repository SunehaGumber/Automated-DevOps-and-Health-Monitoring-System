import { useContext, useEffect } from "react";
import {
  createServer,
  getServers,
  updateServer,
  checkServer,
  deleteServer,
  refreshServers,
  fetchServer,
  getLogs,
} from "../services/server.service";
import { ServerContext } from "../context/ServerContext";
import { socket } from "../../../socket/socket";

export const useService = () => {
  const context = useContext(ServerContext);
  const {
    server,
    setServer,
    servers,
    setServers,
    loading,
    setLoading,
    logs,
    setLogs,
  } = context;

  const handleCreateServer = async ({ name, url }) => {
    try {
      const data = await createServer({ name, url });
      setServer(data?.server);
      return data;
    } catch (err) {}
  };

  const handleGetServers = async () => {
    try {
      setLoading(true);
      const data = await getServers();
      setServers(data?.servers);
      return data;
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateServer = async ({ id }) => {
    try {
      const data = await updateServer({ id });
      setServer(data?.server);
      setServers((prev) => prev.map((s) => (s._id === id ? data.server : s)));
      return data;
    } catch (err) {}
  };

  const handleDeleteServer = async ({ id }) => {
    try {
      const data = await deleteServer({ id });
      setServers((prev) => prev.filter((s) => s._id !== id));
      return data;
    } catch (err) {}
  };
  // refreshing a single server
  const handleCheckServer = async ({ id }) => {
    try {
      const data = await checkServer({ id });
      setServers((prevServers) =>
        prevServers.map((s) => (s._id === id ? { ...s, ...data.server } : s)),
      );

      return data;
    } catch (err) {}
  };

  const handleRefreshServers = async () => {
    try {
      const data = await refreshServers();
      setServers(data?.servers);
      return data;
    } catch (err) {}
  };
  // detail about single server that will be rendered on  a single page
  const handleFetchServer = async ({ id }) => {
    try {
      setLoading(true);
      const data = await fetchServer({ id });
      setServer(data?.server);
      return data;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleGetLogs = async ({ id }) => {
    try {
      const data = await getLogs({ id });
      setLogs(data?.logs);
      return data;
    } catch (err) {}
  };
  useEffect(() => {
    const handleRealTimeUpdate = (data) => {
      setServers((prev) =>
        prev.map((server) =>
          server._id.toString() === data.serverId.toString()
            ? {
                ...server,
                status: data.status,
                responseTime: data.responseTime,
                lastChecked: data.lastChecked,
              }
            : server,
        ),
      );
      setServer((prev) => {
        if (!prev) return prev;

        if (prev._id.toString() !== data.serverId.toString()) return prev;

        return {
          ...prev,
          status: data.status,
          responseTime: data.responseTime,
          lastChecked: data.lastChecked,
        };
      });
      setLogs((prev) => {
        if (!prev || prev.length === 0) return prev;

        const newLog = {
          server: data.serverId,
          status: data.status,
          responseTime: data.responseTime,
          lastChecked: data.lastChecked,
        };

        return [...prev, newLog].slice(-50);
      });
    };
    socket.on("server-status-update", (data) => {
      handleRealTimeUpdate(data);
    });

    return () => {
      socket.off("server-status-update", handleRealTimeUpdate);
    };
  }, []);
  return {
    server,
    servers,
    loading,
    logs,
    handleCreateServer,
    handleGetServers,
    handleUpdateServer,
    handleDeleteServer,
    handleCheckServer,
    handleRefreshServers,
    handleFetchServer,
    handleGetLogs,
  };
};
