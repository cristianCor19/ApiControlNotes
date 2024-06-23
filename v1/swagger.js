import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Configuration of the api documentation

const options = {
    definition: {
        info:{
            title: 'Api control notes',
            version: '1.0.0'
        },
        basePath: '/'
    },
    apis: [
        './v1/routes/*.js'
    ],
}


// Docs in json format
const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app) =>{
    const swaggerOptions = {
        swaggerOptions: {
            defaultModelsExpandDepth: -1, 
        },
    };
    app.use('/api-docs',  swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions))

}

export default swaggerDocs
