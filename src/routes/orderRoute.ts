import express from "express";
import {
    createOrderFN,
    deleteOrderFN,
    getOrderFN,
    searchOrdersFN,
    updateOrderFN,
} from "../controllers/orderController";

export const routerOrder = express.Router();

routerOrder.get("/search", searchOrdersFN);
routerOrder.get("/detail/:id", getOrderFN);
routerOrder.post("/create", createOrderFN);
routerOrder.put("/update/:id", updateOrderFN);
routerOrder.delete("/delete/:id", deleteOrderFN);
