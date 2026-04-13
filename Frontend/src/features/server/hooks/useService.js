import { useContext } from "react";
import { createServer, getServers, updateServer, checkServer, deleteServer, refreshServers, fetchServer,getLogs } from '../services/server.service'
import { ServerContext } from "../context/ServerContext";

export const useService = () => {
    const context = useContext(ServerContext);
    const { server, setServer, servers, setServers, loading, setLoading,logs,setLogs } = context;

    const handleCreateServer = async ({name,url}) => {
        try {
            const data = await createServer({ name, url });
            setServer(data?.server);
            return data;
        } catch (err) {
            
        }
    }

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
    }

    const handleUpdateServer = async ({id}) => {
        try {
        
            const data = await updateServer({ id });
            setServer(data?.server);
            setServers((prev) => prev.map((s) => s._id === id ? data.server : s));
            return data;
        } catch (err) {
            
        } 
    }

    const handleDeleteServer = async ({id}) => {
        try {

            const data = await deleteServer({ id });
            setServers((prev) => prev.filter((s) => s._id !== id));
            return data;
        } catch (err) {
            
        } 
    }
    // refreshing a single server
    const handleCheckServer = async ({id}) => {
        try {
            const data = await checkServer({ id });
            setServers((prevServers) => 
            prevServers.map((s) => 
                s._id === id ? { ...s, ...data.server } : s
            )
            );
            return data;
        } catch (err) {
            
        }
    }

    const handleRefreshServers = async () => {
        try {
            const data = await refreshServers();
            setServers(data?.servers);
            return data;
        } catch (err) {
            
        } 
    }
    // detail about single server that will be rendered on  a single page
    const handleFetchServer = async ({id}) => {
        try {
            setLoading(true);
            const data = await fetchServer({ id });
            setServer(data?.server);
            return data;
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    const handleGetLogs = async ({ id }) => {
        try {
         
            const data = await getLogs({ id });
            setLogs(data?.logs);
            return data;
        } catch (err) {
            
        }
    }
    return {
        server, servers, loading,logs, handleCreateServer, handleGetServers, handleUpdateServer, handleDeleteServer, handleCheckServer, handleRefreshServers,
        handleFetchServer,handleGetLogs
    }
}