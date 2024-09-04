import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
    createProductFN,
    getProductFN,
    updateProductFN,
} from "../controllers/productController";

export const routerProduct = express.Router();

routerProduct.post("/:id", getProductFN);
routerProduct.post("/create", authenticateToken, createProductFN);
routerProduct.post("/update/:id", authenticateToken, updateProductFN);
