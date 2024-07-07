import { Request, Response } from "express";
import { IUser, IUserUpdate } from "../types/user";
import { checkValidate } from "../utils/regex";
import { createUser, getDetailUser, loginUser, updateUser } from "../services/authService";
import { refreshTokenJwtService } from "../services/tokenService";


const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password }: IUser = req.body;
        if (!name || !email || !password) return res.status(400).json("All fields are required!");
        if (!checkValidate(email)) return res.status(400).json("Email not matched!");

        const newUser = await createUser({ name, email, password });
        return res.status(200).json(newUser);
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error?.message
        });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: 'Please enter complete information!'
            });
        }

        const response: any = await loginUser(req.body);
        const { refresh_token } = response;

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/'
        });

        return res.status(200).json({
            data: response
        });
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error?.message
        });
    }
};

const refreshToken = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: 'Missing authorization token'
            });
        }

        const response = await refreshTokenJwtService(token);
        return res.status(200).json(response);
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error?.message
        });
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 200,
            message: 'Logout successfully!'
        });
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error?.message
        });
    }
};

const detail = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 400,
                message: 'Missing user ID!'
            });
        }

        const response = await getDetailUser(userId);
        return res.status(200).json(response);
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error?.message
        });
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id;
        const {name, image}: IUserUpdate = req.body;
        
        if (!userId) {
            return res.status(400).json({
                status: 400,
                message: 'Missing user ID!'
            })
        }
        if(!name){
            return res.status(400).json({
                status: 400,
                message: 'Bad request!'
            })
        }

        const response = await updateUser(userId, {name, image});
        return res.status(200).json(response);
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error?.message
        });
    }
}


export {
    register,
    login,
    refreshToken,
    logout,
    detail,
    update,
}