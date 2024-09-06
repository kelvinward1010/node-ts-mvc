import { productModel } from "../models/ProductModel";
import { IProduct, IProductUpdate } from "../types/product";

const searchProducts = (name?: string, type?: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let finalSearch =
                name || type
                    ? {
                          $or: [
                              { name: new RegExp(String(name)) },
                              { type: String(type) },
                          ],
                      }
                    : {};

            const searchPdts = await productModel
                .find(finalSearch)
                .sort({ createdAt: -1 });

            if (searchPdts === null) {
                resolve({
                    status: 404,
                    message: "Not found any product!",
                });
            }

            resolve({
                status: 200,
                message: "Successfully!",
                data: searchPdts,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const createProduct = (postInfo: IProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newProduct: any = await productModel.create(postInfo);
            await newProduct.save();

            if (newProduct) {
                resolve({
                    status: 200,
                    message: "ok",
                    data: { ...newProduct._doc },
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
            const checkProduct = await productModel.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: 404,
                    message: "This product doesn't exist!",
                });
            }

            resolve({
                status: 200,
                message: "ok",
                data: checkProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (id: string, data: IProductUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await productModel.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: 404,
                    message: "This product doesn't exist!",
                });
            }

            const updatePdct = await productModel.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true },
            );

            resolve({
                status: 200,
                message: "ok",
                data: updatePdct,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await productModel.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: 404,
                    message: "This product doesn't exist!",
                });
            }

            const deleteProduct = await productModel.findByIdAndDelete(id);

            resolve({
                status: 200,
                message: "Deleted",
                data: deleteProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};

export {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
};
