import express from 'express';
import authRouter from './routes/auth.routes.js';
import serverRouter from './routes/server.routes.js';
import logRouter from './routes/log.routes.js';
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/error.middleware.js';
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/server', serverRouter);
app.use('/api/log', logRouter);

app.use(errorHandler);

export default app;
