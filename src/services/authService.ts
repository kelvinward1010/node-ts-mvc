import * as bcrypt from 'bcrypt';
import { userModel } from "../models/UserModel";
import { IUser, IUserLogin, IUserUpdate } from "../types/user";
import { createToken, generalAccessToken, generalRefreshToken } from './tokenService';


const createUser = (newUser: IUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password } = newUser;
        try {
            let checkUser = await userModel.findOne({ email });
            if (checkUser) {
                resolve({
                    status: 409,
                    message: 'User had been created along time ago!'
                })
            }
            const createNewUser: any = new userModel({ name, email, password });

            const salt = await bcrypt.genSalt(10);
            createNewUser.password = await bcrypt.hash(newUser.password, salt);


            await createNewUser.save();

            const token = createToken(createNewUser._id)

            if (token !== null) {
                resolve({
                    status: 200,
                    message: 'User created successfully',
                    data: { ...createNewUser._doc }
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

const loginUser = (userLogin: IUserLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser: any = await userModel.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 404,
                    message: "This account doesn't exist!"
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser?.password)

            if (!comparePassword) {
                resolve({
                    status: 401,
                    message: 'Wrong password or account!'
                })
            }

            const access_token = await generalAccessToken(checkUser?._id)
            const refresh_token = await generalRefreshToken(checkUser?._id)

            resolve({
                status: 200,
                message: 'Login successfully!',
                data: checkUser,
                access_token,
                refresh_token,
            })

        } catch (error) {
            reject(error)
        }
    })
}

const getDetailUser = async (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userModel.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 404,
                    message: "This account doesn't exist!"
                })
            }
            resolve({
                status: 200,
                message: 'Success',
                data: user
            })

        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id: string, data: IUserUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await userModel.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 404,
                    message: "This account doesn't exist!"
                })
            }

            const updateUser = await userModel.findByIdAndUpdate(id, {$set: data}, { new: true })
            
            resolve({
                status: 200,
                message: 'Updated user successfully!',
                data: updateUser
            })

        } catch (e) {
            reject(e)
        }
    })
}


export {
    createUser,
    loginUser,
    getDetailUser,
    updateUser,
}