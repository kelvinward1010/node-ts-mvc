import { Request, Response } from "express";
import { ISearchUser, IUser, IUserUpdate } from "../types/user";
import { deleteUser, searchUsers } from "../services/userService";
import { checkValidate } from "../utils/regex";
import { createUser, getDetailUser, updateUser } from "../services/authService";

const searchUsersFN = async (req: Request, res: Response) => {
    try {
        const querySearch: ISearchUser = req.query;

        const response = await searchUsers(
            querySearch.name,
            querySearch.email,
            querySearch.isAdmin,
            querySearch.page,
        );
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error?.message,
        });
    }
};

const createUserFN = async (req: Request, res: Response) => {
    try {
        const { name, email, password, image }: IUser = req.body;
        if (!name || !email || !password)
            return res.status(400).json("All fields are required!");
        if (!checkValidate(email))
            return res.status(400).json("Email not matched!");

        const newUser = await createUser({ name, email, password, image });
        return res.status(200).json(newUser);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error?.message,
        });
    }
};

const getUserFN = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 400,
                message: "Missing user ID!",
            });
        }

        const response = await getDetailUser(userId);
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error?.message,
        });
    }
};

const updateUserFN = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id;
        const { name, email, image, isAdmin }: IUserUpdate = req.body;

        if (!userId) {
            return res.status(400).json({
                status: 400,
                message: "Missing user ID!",
            });
        }
        if (!name) {
            return res.status(400).json({
                status: 400,
                message: "Bad request!",
            });
        }

        const response = await updateUser(userId, {
            name,
            image,
            isAdmin,
            email,
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

const deleteUserFN = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id;

        if (!userId) {
            return res.status(400).json({
                status: 400,
                message: "Bad request!",
            });
        }

        const response = await deleteUser(userId);
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error?.message,
        });
    }
};

export { searchUsersFN, createUserFN, getUserFN, updateUserFN, deleteUserFN };
