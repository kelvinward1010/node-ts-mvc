import express from "express";
import { authenticateTokenAdmin } from "../middleware/authMiddleware";
import {
    createProductFN,
    getProductFN,
    updateProductFN,
} from "../controllers/productController";

export const routerProduct = express.Router();

routerProduct.post("/:id", getProductFN);
routerProduct.post("/create", authenticateTokenAdmin, createProductFN);
routerProduct.post("/update/:id", authenticateTokenAdmin, updateProductFN);
