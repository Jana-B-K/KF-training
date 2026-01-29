import express from 'express';
import userRouter from './routes/user.route.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use('/api', userRouter);
console.log('app.js loaded');


//this is used to handle all errors so this need to be last
app.use(errorHandler);
export default app;
