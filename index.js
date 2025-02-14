import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './v1/routes/user.routes.js'
import sessionRoutes from './v1/routes/session.routes.js'
import subjectRoutes from './v1/routes/subject.routes.js'
import activityRoutes from './v1/routes/activity.routes.js'
import connectToDatabase from './drivers/connect_db.js'
import swaggerDocs from './v1/swagger.js';



const app = express();

const corsOptions = {
    origin: ["", ""],
    credentials: true
};

app.use(cors(corsOptions))
dotenv.config()

app.set('port', process.env.PORT)
app.use(express.json())

connectToDatabase()

app.use('/user', userRoutes)
app.use('/session', sessionRoutes)           
app.use('/subject', subjectRoutes)           
app.use('/activity', activityRoutes)           

app.listen(app.get('port'), () =>{
    console.log(`server listening to port : ${app.get('port')}`);
    swaggerDocs(app, process.env.PORT)
})