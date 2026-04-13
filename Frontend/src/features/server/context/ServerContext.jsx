import { createContext, useState } from "react";

export const ServerContext = createContext();

export const ServerProvider = ({children}) => {
    const [server, setServer] = useState();
    const [servers, setServers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState([]);
    return (
        <ServerContext.Provider value={{server,setServer,servers,setServers,loading,setLoading,logs,setLogs}}>
            {children}
        </ServerContext.Provider>
    )
}