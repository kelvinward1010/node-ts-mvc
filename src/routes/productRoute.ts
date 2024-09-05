import express from "express";
import { authenticateTokenAdmin } from "../middleware/authMiddleware";
import {
    createProductFN,
    getProductFN,
    updateProductFN,
} from "../controllers/productController";

export const routerProduct = express.Router();

routerProduct.get("/:id", getProductFN);
routerProduct.post("/create", authenticateTokenAdmin, createProductFN);
routerProduct.put("/update/:id", authenticateTokenAdmin, updateProductFN);
