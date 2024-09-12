import express from "express";
import { authenticateTokenAdmin } from "../middleware/authMiddleware";
import {
    createUserFN,
    deleteUserFN,
    getUserFN,
    searchUsersFN,
    updateUserFN,
} from "../controllers/userController";
export const routerUser = express.Router();

routerUser.get("/detail/:id", authenticateTokenAdmin, getUserFN);
routerUser.get("/search", authenticateTokenAdmin, searchUsersFN);
routerUser.post("/create", authenticateTokenAdmin, createUserFN);
routerUser.put("/:id", authenticateTokenAdmin, updateUserFN);
routerUser.delete("/delete/:id", authenticateTokenAdmin, deleteUserFN);
