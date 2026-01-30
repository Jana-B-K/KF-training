import express from 'express';
import morgan from 'morgan';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.router.js';
import { errorHandler } from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import authenticate  from './middleware/auth.middleware.js';

const app = express();

app.use(morgan());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);       // public routes
app.use('/api', authenticate, userRouter); // protected routes

app.use(errorHandler);

export default app;
