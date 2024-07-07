import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const secretKey: any = process.env.JWT_ACCESSTOKEN;
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, secretKey, (err: any, decoded: any) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token has expired' });
                }
                return res.status(403).json({ message: 'Invalid token' });
            }

            req.body = {...req.body, decoded};
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
