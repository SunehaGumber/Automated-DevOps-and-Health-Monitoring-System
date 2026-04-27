import { Server } from "socket.io";

let io;
export default function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials:true 
        }
    })

    io.on('connection', (socket) => {
        console.log("Connection esatblished..", socket.id);
    })
}

export function getIO() {
    if (!io) {
        throw new Error("Connection not established!");
    }
    return io;
}