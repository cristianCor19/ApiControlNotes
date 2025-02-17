import app from "./config/server.js";
import {PORT} from './config/env.js';

import swaggerDocs from './v1/swagger.js';


app.listen(PORT, () =>{
    console.log(`server listening to port : ${PORT}`);
    swaggerDocs(app, PORT)
})