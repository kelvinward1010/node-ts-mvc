import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        paymentmethod: { type: String, required: true },
        idUser: { type: String, required: true },
        deliveryaddress: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
        },
        products: [
            {
                key: { type: String, required: true },
                _id: { type: String, required: true },
                name: { type: String, required: true },
                image: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                type: { type: String, required: true },
            },
        ],
        yourinvoice: {
            price: { type: Number, required: true },
            shipping_price: { type: Number, required: true },
            totalprice: { type: Number, required: true },
        },
        status: { type: String, required: true },
        completed: { type: Boolean, required: true },
        deliveredAt: { type: String },
    },
    { timestamps: true },
);

export const orderModel = mongoose.model("Order", orderSchema);
