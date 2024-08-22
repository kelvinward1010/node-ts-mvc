"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPosts = exports.getNewestPosts = exports.getPost = exports.updatePost = exports.createPost = void 0;
const PostModel_1 = require("../models/PostModel");
const searchPosts = (searchTitle, searchTopic) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let finalSearch = (searchTitle || searchTopic ? {
                $or: [
                    { title: new RegExp(String(searchTitle)) },
                    { topic: { $in: searchTopic } }
                ]
            } : {});
            const searchPosts = yield PostModel_1.postModel
                .find(finalSearch)
                .sort({ createdAt: -1 });
            if (searchPosts === null) {
                resolve({
                    status: 404,
                    message: "Not found any post!"
                });
            }
            resolve({
                status: 200,
                message: 'Successfully!',
                data: searchPosts
            });
        }
        catch (e) {
            reject(e);
        }
    }));
};
exports.searchPosts = searchPosts;
const createPost = (postInfo) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newPost = yield PostModel_1.postModel.create(postInfo);
            yield newPost.save();
            if (newPost) {
                resolve({
                    status: 200,
                    message: "Created post successfully!",
                    data: Object.assign({}, newPost._doc)
                });
            }
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.createPost = createPost;
const getPost = (id) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkPost = yield PostModel_1.postModel.findOne({
                _id: id
            });
            if (checkPost === null) {
                resolve({
                    status: 404,
                    message: "This post doesn't exist!"
                });
            }
            resolve({
                status: 200,
                message: 'Successfully!',
                data: checkPost
            });
        }
        catch (e) {
            reject(e);
        }
    }));
};
exports.getPost = getPost;
const updatePost = (id, data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkPost = yield PostModel_1.postModel.findOne({
                _id: id
            });
            if (checkPost === null) {
                resolve({
                    status: 404,
                    message: "This post doesn't exist!"
                });
            }
            const updatePost = yield PostModel_1.postModel.findByIdAndUpdate(id, { $set: data }, { new: true });
            resolve({
                status: 200,
                message: 'Updated post successfully!',
                data: updatePost
            });
        }
        catch (e) {
            reject(e);
        }
    }));
};
exports.updatePost = updatePost;
const getNewestPosts = () => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findnewestPosts = yield PostModel_1.postModel.find()
                .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo (mới nhất trước)
                .limit(4);
            if (findnewestPosts === null) {
                resolve({
                    status: 404,
                    message: "Not found any post!"
                });
            }
            resolve({
                status: 200,
                message: 'Successfully!',
                data: findnewestPosts
            });
        }
        catch (e) {
            reject(e);
        }
    }));
};
exports.getNewestPosts = getNewestPosts;
