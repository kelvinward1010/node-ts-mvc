import { Request, Response } from "express";
import { IUser } from "../types/user";
import { checkValidate } from "../utils/regex";
import { createUser } from "../services/authService";


const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password }: IUser = req.body;
        if(!name || !email || !password) return res.status(400).json("All fields are required!");
        if(!checkValidate(email)) return res.status(400).json("Email not matched!");
        
        const newUser = await createUser({ name, email, password });
        return res.status(200).json(newUser);
    } catch (error: any) {
        res.status(500).json("Error on server: " + error.message)
    }
}

export { 
    register,
}