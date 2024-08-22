"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const routes_1 = require("./routes");
const serverless_http_1 = __importDefault(require("serverless-http"));
// import swaggerDocument from './config/swagger';
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // Middleware xử lý dữ liệu form-urlencoded
(0, database_1.connectDatabase)();
// swaggerDocument(app, Number(port));
(0, routes_1.routes)(app);
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express on Nodejs!");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
module.exports.handler = (0, serverless_http_1.default)(app);
