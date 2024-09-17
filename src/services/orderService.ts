import { orderModel } from "../models/Order";
import { IOrder, IOrderUpdate } from "../types/order";

const ITEMS_PER_PAGE = 10;

const searchOrders = (
    id?: string,
    status?: string,
    completed?: boolean,
    idUser?: string,
    nameOrder?: string,
    nameUser?: string,
    page = 1,
) => {
    return new Promise(async (resolve, reject) => {
        try {
            let finalSearch = id
                ? { $or: [{ _id: String(id) }] }
                : idUser
                  ? { $or: [{ idUser: String(idUser) }] }
                  : status || completed || nameOrder
                    ? {
                          $or: [
                              { status: String(status) },
                              { completed: Boolean(completed) },
                              { name: new RegExp(String(nameOrder)) },
                          ],
                      }
                    : nameUser
                      ? {
                            $or: [
                                {
                                    "deliveryaddress.name": new RegExp(
                                        String(nameUser),
                                    ),
                                },
                            ],
                        }
                      : {};

            const totalOrders = await orderModel.countDocuments(finalSearch);

            const searchorders = await orderModel
                .find(finalSearch)
                .sort({ createdAt: -1 })
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);

            if (searchorders === null) {
                resolve({
                    status: 404,
                    message: "Not found any product!",
                });
            }

            resolve({
                status: 200,
                message: "Ok!",
                data: {
                    items: searchorders,
                    currentPage: Number(page),
                    totalPages: Math.ceil(totalOrders / ITEMS_PER_PAGE),
                },
            });
        } catch (e) {
            reject(e);
        }
    });
};

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

const updateOrder = (id: string, data: IOrderUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await orderModel.findOne({
                _id: id,
            });
            if (checkOrder === null) {
                resolve({
                    status: 404,
                    message: "This order doesn't exist!",
                });
            }

            if (data.status) {
                const updateorder = await orderModel.findByIdAndUpdate(
                    id,
                    {
                        $set: {
                            status: data.status,
                        },
                    },
                    { new: true },
                );

                resolve({
                    status: 200,
                    message: "ok",
                    data: updateorder,
                });
            }

            if (data.completed) {
                const updateorder = await orderModel.findByIdAndUpdate(
                    id,
                    {
                        $set: {
                            completed: data.completed,
                        },
                    },
                    { new: true },
                );

                resolve({
                    status: 200,
                    message: "ok",
                    data: updateorder,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const deleteOrder = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await orderModel.findOne({
                _id: id,
            });
            if (checkOrder === null) {
                resolve({
                    status: 404,
                    message: "This order doesn't exist!",
                });
            }

            const deleteOrder = await orderModel.findByIdAndDelete(id);

            resolve({
                status: 200,
                message: "Deleted",
                data: deleteOrder,
            });
        } catch (e) {
            reject(e);
        }
    });
};

export { createOrder, searchOrders, deleteOrder, updateOrder };
