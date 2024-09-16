import { Request, Response } from "express";
import { IOrder } from "../types/order";
import { createOrder } from "../services/orderService";

const createOrderFN = async (req: Request, res: Response) => {
    try {
        const {
            paymentmethod,
            idUser,
            deliveryaddress,
            products,
            yourinvoice,
            completed,
            paidAt,
            deliveredAt,
        }: IOrder = req.body;

        if (!paymentmethod || !idUser || !deliveryaddress || !yourinvoice) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request",
            });
        }

        const createorder = await createOrder({
            paymentmethod,
            idUser,
            deliveryaddress,
            products,
            yourinvoice,
            completed,
            paidAt,
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

export { createOrderFN };
