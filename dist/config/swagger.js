"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
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
const specs = (0, swagger_jsdoc_1.default)(options);
function swaggerDocumentation(app, port) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    app.get('docs.json', (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(specs);
    });
    console.log(`Swagger Documentation is available at http://localhost:${port}/api-docs`);
}
exports.default = swaggerDocumentation;
