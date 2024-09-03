import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { createProductFN } from "../controllers/productController";

export const routerProduct = express.Router();

routerProduct.post("/create", authenticateToken, createProductFN);
