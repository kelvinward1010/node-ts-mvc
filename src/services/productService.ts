import { productModel } from "../models/ProductModel";
import { IProduct } from "../types/product";

const createProduct = (postInfo: IProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newPost: any = await productModel.create(postInfo);
            await newPost.save();

            if (newPost) {
                resolve({
                    status: 200,
                    message: "ok",
                    data: { ...newPost._doc },
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getProduct = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkPost = await productModel.findOne({
                _id: id,
            });
            if (checkPost === null) {
                resolve({
                    status: 404,
                    message: "This product doesn't exist!",
                });
            }

            resolve({
                status: 200,
                message: "ok",
                data: checkPost,
            });
        } catch (e) {
            reject(e);
        }
    });
};

export { createProduct, getProduct };
