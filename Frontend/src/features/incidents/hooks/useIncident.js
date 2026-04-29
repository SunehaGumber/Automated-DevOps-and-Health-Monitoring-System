import { useContext, useEffect } from "react";
import { IncidentContext } from "../context/IncidentContext";
import { showIncidents } from "../services/incident.service";
import { socket } from "../../../socket/socket";

export const useIncident = (id) => {
  const { incidents, setIncidents } = useContext(IncidentContext);

  const handleShowIncidents = async ({ id }) => {
    try {
      const data = await showIncidents({ id });
      setIncidents(data?.incidents);
      return data?.incidents;
    } catch (err) {}
  };

  useEffect(() => {
    const handleResolved = (data) => {
      if (data.server.toString() !== id) return;
      setIncidents((prev) =>
        prev.map((incident) => (incident._id === data._id ? data : incident)),
      );
    };

    const handleCreated = (data) => {
      if (data.server.toString() !== id) return;
      const exists = prev.find((i) => i._id === data._id);
      if (exists) return prev;
      return [data, ...prev];
    };

    socket.on("incident-created", handleCreated);
    socket.on("incident-resolved", handleResolved);

    return () => {
      socket.off("incident-created", handleCreated);
      socket.off("incident-resolved", handleResolved);
    };
  }, [id]);
  return {
    incidents,
    setIncidents,
    handleShowIncidents,
  };
};
