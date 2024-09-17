import { Request, Response } from "express";
import { IOrder, IOrderUpdate, ISearchOrder } from "../types/order";
import {
    createOrder,
    deleteOrder,
    getOrder,
    searchOrders,
    updateOrder,
} from "../services/orderService";

const searchOrdersFN = async (req: Request, res: Response) => {
    try {
        const querySearch: ISearchOrder = req.query;

        const response = await searchOrders(
            querySearch.id,
            querySearch.status,
            querySearch.completed,
            querySearch.idUser,
            querySearch.nameOrder,
        );
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error?.message,
        });
    }
};

const getOrderFN = async (req: Request, res: Response) => {
    try {
        const orderId: string = req.params.id;

        if (!orderId) {
            return res.status(400).json({
                status: 400,
                message: "Bad request!",
            });
        }

        const response = await getOrder(orderId);
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error?.message,
        });
    }
};

const createOrderFN = async (req: Request, res: Response) => {
    try {
        const {
            name,
            paymentmethod,
            idUser,
            deliveryaddress,
            products,
            yourinvoice,
            status,
            completed,
            deliveredAt,
        }: IOrder = req.body;

        if (!paymentmethod || !idUser || products.length > 0) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request",
            });
        }

        const createorder = await createOrder({
            name,
            paymentmethod,
            idUser,
            deliveryaddress,
            products,
            yourinvoice,
            status,
            completed,
            deliveredAt,
        });

        return res.status(200).json(createorder);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error?.message,
        });
    }
};

const updateOrderFN = async (req: Request, res: Response) => {
    try {
        const productId: string = req.params.id;
        const { status, completed }: IOrderUpdate = req.body;

        if (!status && !completed) {
            return res.status(400).json({
                status: 400,
                message: "Bad request!",
            });
        }

        const response = await updateOrder(productId, {
            status,
            completed,
        });
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error?.message,
        });
    }
};

const deleteOrderFN = async (req: Request, res: Response) => {
    try {
        const orderId: string = req.params.id;

        if (!orderId) {
            return res.status(400).json({
                status: 400,
                message: "Bad request!",
            });
        }

        const response = await deleteOrder(orderId);
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error?.message,
        });
    }
};

export {
    createOrderFN,
    searchOrdersFN,
    deleteOrderFN,
    updateOrderFN,
    getOrderFN,
};
