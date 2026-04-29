import { API } from "../../auth/services/API";

export async function showIncidents({id}) {
    try {
        const response = await API.get(`/api/incident/server/${id}`, {
            id
        });
        return response?.data;
    } catch (err) {
        console.log(err);
    }
}