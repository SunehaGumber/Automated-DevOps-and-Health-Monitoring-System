import { createContext, useState } from "react";

export const IncidentContext = createContext();

export default function IncidentProvider({ children }) {
  const [incidents, setIncidents] = useState([]);
  return (
    <IncidentContext.Provider value={{ incidents, setIncidents }}>
      {children}
    </IncidentContext.Provider>
  );
}
