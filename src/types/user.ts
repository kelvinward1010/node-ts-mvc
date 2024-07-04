export interface IUser{
    name: string;
    email: string;
    password: string;
}

export interface IUserModel extends IUser{
    _id: string;
}