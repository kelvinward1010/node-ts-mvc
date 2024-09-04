import { Request, Response } from "express";
import { IProduct, IProductUpdate } from "../types/product";
import {
    createProduct,
    getProduct,
    updateProduct,
} from "../services/productService";

const createProductFN = async (req: Request, res: Response) => {
    try {
        const {
            name,
            image,
            description,
            quantity,
            price,
            appreciation,
            type,
            authorID,
        }: IProduct = req.body;

        if (
            !name ||
            !image ||
            !description ||
            !quantity ||
            !price ||
            !appreciation ||
            !type ||
            !authorID
        ) {
            return res.status(400).json({
                status: 400,
                message: "Bad Request",
            });
        }

        const newProduct = await createProduct({
            name,
            image,
            description,
            quantity,
            price,
            appreciation,
            type,
            authorID,
        });
        return res.status(200).json(newProduct);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error?.message,
        });
    }
};

const getProductFN = async (req: Request, res: Response) => {
    try {
        const productId: string = req.params.id;

        if (!productId) {
            return res.status(400).json({
                status: 400,
                message: "Bad request!",
            });
        }

        const response = await getProduct(productId);
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error?.message,
        });
    }
};

const updateProductFN = async (req: Request, res: Response) => {
    try {
        const productId: string = req.params.id;
        const {
            name,
            image,
            description,
            quantity,
            price,
            appreciation,
            type,
        }: IProductUpdate = req.body;

        if (
            !name ||
            !image ||
            !description ||
            !quantity ||
            !price ||
            !appreciation ||
            !type ||
            !productId
        ) {
            return res.status(400).json({
                status: 400,
                message: "Bad request!",
            });
        }

        const response = await updateProduct(productId, {
            name,
            image,
            description,
            quantity,
            price,
            appreciation,
            type,
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

export { createProductFN, getProductFN, updateProductFN };
