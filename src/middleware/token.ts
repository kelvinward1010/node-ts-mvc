import jwt from "jsonwebtoken";

export const createToken = (_id: string): string => {
    const jwtkey: any = process.env.JWT_SECRET;
    return jwt.sign({_id}, jwtkey, { expiresIn: "10d"})
}