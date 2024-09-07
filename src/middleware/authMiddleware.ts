import { Request, Response, NextFunction } from "express";
import { userModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

export const authenticateTokenAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const secretKey: any = process.env.JWT_ACCESSTOKEN;
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, secretKey, async (err: any, userID: any) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res
                        .status(401)
                        .json({ message: "Token has expired" });
                }
                return res.status(403).json({ message: "Invalid token" });
            }

            const user = await userModel.findOne({ _id: userID });

            if (user?.isAdmin) {
                req.body = { ...req.body, user };
                next();
            } else {
                return res.status(403).json({
                    message: "You don't have permission to do",
                    status: 403,
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
