import incidentModel from "../models/incident.model.js";

export async function getIncidents(req, res) {
    const id  = req.params.id;
    const user = req.user;

    const incidents = await incidentModel.find({
        server:id
    })

    return res.status(200).json({
        message: "Incidents of a particular server fetched successfully!",
        incidents
    })
}