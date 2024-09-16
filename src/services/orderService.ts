import { orderModel } from "../models/Order";
import { IOrder } from "../types/order";

const createOrder = (orderInfo: IOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newOrder: any = await orderModel.create(orderInfo);
            await newOrder.save();

            if (newOrder) {
                resolve({
                    status: 200,
                    message: "ok",
                    data: { ...newOrder._doc },
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export { createOrder };
