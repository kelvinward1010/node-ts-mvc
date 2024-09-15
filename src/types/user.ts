export interface ISearchUser {
    name?: string;
    email?: string;
    isAdmin?: boolean;
    page?: number;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    image?: string;
}

export interface IUserModel extends IUser {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserUpdate {
    name?: string;
    email?: string;
    image?: string;
    isAdmin?: boolean;
}
