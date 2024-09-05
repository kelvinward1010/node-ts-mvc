import express from "express";
import { authenticateTokenAdmin } from "../middleware/authMiddleware";
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
routerPost.post("/create", authenticateTokenAdmin, createPostFN);
routerPost.put("/update/:id", authenticateTokenAdmin, updatePostFN);
routerPost.delete("/delete/:id", authenticateTokenAdmin, deletePostFN);
routerPost.get("/post-detail/:id", getPostFN);
routerPost.get("/posts-newest", getNewestPostsFN);
