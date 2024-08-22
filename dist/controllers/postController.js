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
exports.searchPostsFN = exports.getNewestPostsFN = exports.getPostFN = exports.updatePostFN = exports.createPostFN = void 0;
const postService_1 = require("../services/postService");
const searchPostsFN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySearch = req.query;
        const response = yield (0, postService_1.searchPosts)(querySearch.title, querySearch.topic);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.searchPostsFN = searchPostsFN;
const createPostFN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topic, title, author, content, description, image_thumbnail } = req.body;
        if (!topic || !title || !content || !description || !image_thumbnail) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request',
            });
        }
        if (!author.id || !author.name) {
            return res.status(400).json({
                status: 400,
                message: 'Missing author information!',
            });
        }
        const newPost = yield (0, postService_1.createPost)({ topic, title, author, content, description, image_thumbnail });
        return res.status(200).json(newPost);
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.createPostFN = createPostFN;
const getPostFN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).json({
                status: 400,
                message: 'Missing post ID!'
            });
        }
        const response = yield (0, postService_1.getPost)(postId);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.getPostFN = getPostFN;
const updatePostFN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const { topic, title, author, content, description, image_thumbnail } = req.body;
        if (!postId) {
            return res.status(400).json({
                status: 400,
                message: 'Missing post ID!'
            });
        }
        if (!content || !description || !image_thumbnail || !title || !topic) {
            return res.status(400).json({
                status: 400,
                message: 'Bad request!'
            });
        }
        const response = yield (0, postService_1.updatePost)(postId, { topic, title, author, content, description, image_thumbnail });
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.updatePostFN = updatePostFN;
const getNewestPostsFN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, postService_1.getNewestPosts)();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.getNewestPostsFN = getNewestPostsFN;
