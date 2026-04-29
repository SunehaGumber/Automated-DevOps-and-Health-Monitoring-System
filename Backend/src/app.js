import express from 'express';
import authRouter from './routes/auth.routes.js';
import serverRouter from './routes/server.routes.js';
import logRouter from './routes/log.routes.js';
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/error.middleware.js';
import cors from 'cors';
import incidentRouter from './routes/incident.route.js';

const app = express();

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true     
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/server', serverRouter);
app.use('/api/log', logRouter);
app.use('/api/incident', incidentRouter);

app.use(errorHandler);

export default app;
