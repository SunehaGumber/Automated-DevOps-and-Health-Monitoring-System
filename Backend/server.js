import app from './src/app.js';
import connectDB from './src/config/db.js';
import { initCron } from './src/cron/monitor.js';
import http from 'http'
import initSocket from './src/socket/socket.js';

const server = http.createServer(app);

async function startServer() {
    try {
        await connectDB();
        initSocket(server);

        server.listen(3000, () => {
            console.log("Server is running on port:3000");
            initCron(); 
        });

    } catch (error) {
        console.log("Failed to start server:", error);
    }
}

startServer();



