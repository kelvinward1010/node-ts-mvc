import { userModel } from "../models/UserModel";

const searchUsers = (name?: string, email?: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let finalSearch =
                name || email
                    ? {
                          $or: [
                              { name: new RegExp(String(name)) },
                              { email: new RegExp(String(email)) },
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

export { searchUsers };
