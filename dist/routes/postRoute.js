"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPost = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const postController_1 = require("../controllers/postController");
exports.routerPost = express_1.default.Router();
exports.routerPost.get('/search', postController_1.searchPostsFN);
exports.routerPost.post('/create', authMiddleware_1.authenticateToken, postController_1.createPostFN);
exports.routerPost.put('/update/:id', authMiddleware_1.authenticateToken, postController_1.updatePostFN);
exports.routerPost.get('/post-detail/:id', postController_1.getPostFN);
exports.routerPost.get('/posts-newest', postController_1.getNewestPostsFN);
