import jwt from "jsonwebtoken";

const createToken = (_id: string): string => {
    const jwtkey: any = process.env.JWT_SECRET;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "10d" })
}

const generalAccessToken = (_id: string): string => {
    const jwtkey: any = process.env.JWT_ACCESSTOKEN;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "15m" })
}

const generalRefreshToken = (_id: string): string => {
    const jwtkey: any = process.env.JWT_REFRESHTOKEN;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "15d" })
}

const refreshTokenJwtService = async (token: string) => {
    try {
        const jwtkey: any = process.env.JWT_REFRESHTOKEN;
        const user: any = await jwt.verify(token, jwtkey);

        const access_token = await generalAccessToken(user?._id);

        return {
            status: 200,
            message: 'Token refreshed successfully!',
            access_token
        };
    } catch (error) {
        return {
            status: 401,
            message: "Unauthorized"
        };
    }
};


export {
    createToken,
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService,
}