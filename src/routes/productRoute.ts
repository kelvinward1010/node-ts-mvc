import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
    createProductFN,
    getProductFN,
} from "../controllers/productController";

export const routerProduct = express.Router();

routerProduct.post("/:id", getProductFN);
routerProduct.post("/create", authenticateToken, createProductFN);
