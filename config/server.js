import express from "express";
import cors from 'cors';
import corsOptions from './cors.js';
import connectToDatabase  from '../database/connect_db.js';

//routes


import userRoutes from '../v1/routes/user.routes.js';
import sessionRoutes from '../v1/routes/session.routes.js';
import subjectRoutes from '../v1/routes/subject.routes.js';
import activityRoutes from '../v1/routes/activity.routes.js';


const app = express();

app.use(cors(corsOptions))
app.use(express.json())

connectToDatabase();


app.use('/user', userRoutes)
app.use('/session', sessionRoutes)           
app.use('/subject', subjectRoutes)           
app.use('/activity', activityRoutes)           

export default app;
