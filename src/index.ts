import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from "./config/database";
import { routes } from "./routes";
// import swaggerDocument from './config/swagger';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware xử lý dữ liệu form-urlencoded
connectDatabase();
// swaggerDocument(app, Number(port));
routes(app);

app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express on Nodejs!");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
