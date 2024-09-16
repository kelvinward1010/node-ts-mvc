import express from "express";
import {
    createOrderFN,
    deleteOrderFN,
    searchOrdersFN,
    updateOrderFN,
} from "../controllers/orderController";

export const routerOrder = express.Router();

routerOrder.get("/search", searchOrdersFN);
routerOrder.post("/create", createOrderFN);
routerOrder.put("/update/:id", updateOrderFN);
routerOrder.delete("/delete/:id", deleteOrderFN);
