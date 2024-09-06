import express from "express";
import { authenticateTokenAdmin } from "../middleware/authMiddleware";
import {
    createProductFN,
    deleteProductFN,
    getProductFN,
    searchProductFN,
    updateProductFN,
} from "../controllers/productController";

export const routerProduct = express.Router();

routerProduct.get("/search", searchProductFN);
routerProduct.get("/:id", getProductFN);
routerProduct.post("/create", authenticateTokenAdmin, createProductFN);
routerProduct.put("/update/:id", authenticateTokenAdmin, updateProductFN);
routerProduct.delete("/delete/:id", authenticateTokenAdmin, deleteProductFN);
