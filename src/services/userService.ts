import { userModel } from "../models/UserModel";

const searchUsers = (name?: string, email?: string, isAdmin?: boolean) => {
    return new Promise(async (resolve, reject) => {
        try {
            let finalSearch =
                name || email || isAdmin
                    ? {
                          $or: [
                              { name: new RegExp(String(name)) },
                              { email: new RegExp(String(email)) },
                              { isAdmin: isAdmin },
                          ],
                      }
                    : {};

            const search = await userModel
                .find(finalSearch)
                .sort({ createdAt: -1 });

            if (search === null) {
                resolve({
                    status: 404,
                    message: "Not found any user!",
                });
            }

            resolve({
                status: 200,
                message: "ok!",
                data: search,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await userModel.findOne({
                _id: id,
            });
            if (checkUser === null) {
                resolve({
                    status: 404,
                    message: "This user doesn't exist!",
                });
            }

            const dltUser = await userModel.findByIdAndDelete(id);

            resolve({
                status: 200,
                message: "Deleted",
                data: dltUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

export { searchUsers, deleteUser };
