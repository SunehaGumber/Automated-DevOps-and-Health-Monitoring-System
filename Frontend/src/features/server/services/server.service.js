import { API } from "../../auth/services/API";

export const createServer = async ({name,url}) => {
    try {
        const response = await API.post('/api/server/createServer', { name, url });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getServers = async () => {
    try {
        const response = await API.get('/api/server/getServers');
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const updateServer = async ({id,name,url}) => {
    try {
        const response = await API.patch(`/api/server/update/${id}`, {
            name, url
        });
        return response.data;
    }
    catch (err) {
        console.log("Error", err);
    }
}

export const deleteServer = async ({ id })=>{
    try {
        const response = await API.delete(`/api/server/delete/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}
// single server refresh check
export const checkServer = async ({id})=>{
    try {
        const response = await API.get(`/api/server/check/${id}`)
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const refreshServers = async () => {
    try {
        const response = await API.get('/api/server/update');
        return response.data
    } catch (err) {
        console.log(err);
    }
}

export const fetchServer = async ({id}) => {
    try {
        const response = await API.get(`/api/server/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getLogs = async ({id}) => {
    try {
        const response = await API.get(`/api/log/server/${id}`);
        return response.data;
    } catch (error) {
        console.log(err);  
    }
}