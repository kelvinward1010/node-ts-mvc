import express from "express";
import { createOrderFN } from "../controllers/orderController";

export const routerOrder = express.Router();

routerOrder.post("/create", createOrderFN);
