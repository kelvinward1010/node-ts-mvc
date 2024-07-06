import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    const secretKey: any = process.env.JWT_ACCESSTOKEN;
    const token = await req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.body = decoded; // Lưu thông tin người dùng vào request
        next();
    });
};
