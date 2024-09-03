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
                    message: "Created post successfully!",
                    data: { ...newPost._doc },
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export { createProduct };
