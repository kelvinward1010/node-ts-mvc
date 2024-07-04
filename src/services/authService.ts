import * as bcrypt from 'bcrypt';
import { userModel } from "../models/UserModel";
import { IUser } from "../types/user";
import { createToken } from '../middleware/token';


const createUser = (newUser: IUser) => {
    return new Promise( async (resolve, reject) => {
        const { name, email, password } = newUser;
        try {
            let checkUser = await userModel.findOne({ email });
            if (checkUser) {
                resolve({
                    status: 200,
                    message: 'User had been created along time ago!'
                })
            }
            const createNewUser: any = new userModel({name, email, password});

            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);

            await createNewUser.save();

            const token = createToken(createNewUser._id);

            if(token !== null) {
                resolve({
                    status: 200,
                    message: 'User created successfully',
                    data: {...createNewUser._doc, token}
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}




export {
    createUser,
}