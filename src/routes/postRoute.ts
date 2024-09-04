import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
    createPostFN,
    getNewestPostsFN,
    getPostFN,
    searchPostsFN,
    updatePostFN,
    deletePostFN,
} from "../controllers/postController";

export const routerPost = express.Router();

routerPost.get("/search", searchPostsFN);
routerPost.post("/create", authenticateToken, createPostFN);
routerPost.put("/update/:id", authenticateToken, updatePostFN);
routerPost.delete("/delete/:id", authenticateToken, deletePostFN);
routerPost.get("/post-detail/:id", getPostFN);
routerPost.get("/posts-newest", getNewestPostsFN);
