"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getDetailUser = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = require("../models/UserModel");
const tokenService_1 = require("./tokenService");
const createUser = (newUser) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = newUser;
        try {
            let checkUser = yield UserModel_1.userModel.findOne({ email });
            if (checkUser) {
                resolve({
                    status: 409,
                    message: 'User had been created along time ago!'
                });
            }
            const createNewUser = new UserModel_1.userModel({ name, email, password });
            const salt = yield bcrypt_1.default.genSalt(10);
            createNewUser.password = yield bcrypt_1.default.hash(newUser.password, salt);
            yield createNewUser.save();
            const token = (0, tokenService_1.createToken)(createNewUser._id);
            if (token !== null) {
                resolve({
                    status: 200,
                    message: 'User created successfully',
                    data: Object.assign({}, createNewUser._doc)
                });
            }
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.createUser = createUser;
const loginUser = (userLogin) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = userLogin;
        try {
            const checkUser = yield UserModel_1.userModel.findOne({
                email: email
            });
            if (checkUser === null) {
                resolve({
                    status: 404,
                    message: "This account doesn't exist!"
                });
            }
            const comparePassword = bcrypt_1.default.compareSync(password, checkUser === null || checkUser === void 0 ? void 0 : checkUser.password);
            if (!comparePassword) {
                resolve({
                    status: 401,
                    message: 'Wrong password or account!'
                });
            }
            const access_token = yield (0, tokenService_1.generalAccessToken)(checkUser === null || checkUser === void 0 ? void 0 : checkUser._id);
            const refresh_token = yield (0, tokenService_1.generalRefreshToken)(checkUser === null || checkUser === void 0 ? void 0 : checkUser._id);
            resolve({
                status: 200,
                message: 'Login successfully!',
                data: checkUser,
                access_token,
                refresh_token,
            });
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.loginUser = loginUser;
const getDetailUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserModel_1.userModel.findOne({
                _id: id
            });
            if (user === null) {
                resolve({
                    status: 404,
                    message: "This account doesn't exist!"
                });
            }
            resolve({
                status: 200,
                message: 'Success',
                data: user
            });
        }
        catch (e) {
            reject(e);
        }
    }));
});
exports.getDetailUser = getDetailUser;
const updateUser = (id, data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkUser = yield UserModel_1.userModel.findOne({
                _id: id
            });
            if (checkUser === null) {
                resolve({
                    status: 404,
                    message: "This account doesn't exist!"
                });
            }
            const updateUser = yield UserModel_1.userModel.findByIdAndUpdate(id, { $set: data }, { new: true });
            resolve({
                status: 200,
                message: 'Updated user successfully!',
                data: updateUser
            });
        }
        catch (e) {
            reject(e);
        }
    }));
};
exports.updateUser = updateUser;
