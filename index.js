import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './v1/routes/user.routes.js'
import connectToDatabase from './drivers/connect_db.js'
import swaggerDocs from './v1/swagger.js';




const app = express();

app.use(cors())
dotenv.config()

app.set('port', process.env.PORT)
app.use(express.json())

connectToDatabase()

app.use('/user', userRoutes)

app.listen(app.get('port'), () =>{
    console.log(`server listening to port : ${app.get('port')}`);
    swaggerDocs(app, process.env.PORT)
})