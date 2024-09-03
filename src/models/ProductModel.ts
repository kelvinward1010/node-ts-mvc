import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        appreciation: [
            {
                star: { type: Number, required: true },
                idUser: { type: String, required: true },
            },
        ],
        type: { type: String, required: true },
        authorID: { type: String, required: true },
    },
    { timestamps: true },
);

export const productModel = mongoose.model("Product", productSchema);
