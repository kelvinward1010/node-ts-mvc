import { userModel } from "../models/UserModel";

const ITEMS_PER_PAGE = 10;

const searchUsers = (
    id?: string,
    name?: string,
    email?: string,
    isAdmin?: boolean,
    page = 1,
) => {
    return new Promise(async (resolve, reject) => {
        try {
            let finalSearch = id
                ? { $or: [{ _id: id }] }
                : name || email || isAdmin
                  ? {
                        $or: [
                            { name: new RegExp(String(name)) },
                            { email: new RegExp(String(email)) },
                            { isAdmin: isAdmin },
                        ],
                    }
                  : {};

            const totalProducts = await userModel.countDocuments(finalSearch);

            const search = await userModel
                .find(finalSearch)
                .sort({ createdAt: -1 })
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);

            if (search === null) {
                resolve({
                    status: 404,
                    message: "Not found any user!",
                });
            }

            resolve({
                status: 200,
                message: "ok!",
                data: {
                    items: search,
                    currentPage: Number(page),
                    totalPages: Math.ceil(totalProducts / ITEMS_PER_PAGE),
                },
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
