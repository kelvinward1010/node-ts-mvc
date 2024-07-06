export interface IUser{
    name: string;
    email: string;
    password: string;
}

export interface IUserModel extends IUser{
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserUpdate{
    name?: string;
    image?: string;
}