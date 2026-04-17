import app from './src/app.js';
import connectDB from './src/config/db.js';
import { initCron } from '../Backend/src/cron/monitor.js';

async function startServer() {
    try {
        await connectDB();

        app.listen(3000, () => {
            console.log("Server is running on port:3000");

            initCron(); 
        });

    } catch (error) {
        console.log("Failed to start server:", error);
    }
}

startServer();