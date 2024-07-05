import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import { Express, Request, Response } from "express";


const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rest API Docs',
            version: '1.0.0',
            description: 'My API documentation',
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const specs = swaggerJSDoc(options);

function swaggerDocumentation(app: Express, port: number) {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(specs)
    })

    console.log(`Swagger Documentation is available at http://localhost:${port}/api-docs`)
}

export default swaggerDocumentation;