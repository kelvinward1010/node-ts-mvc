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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.detail = exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const regex_1 = require("../utils/regex");
const authService_1 = require("../services/authService");
const tokenService_1 = require("../services/tokenService");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json("All fields are required!");
        if (!(0, regex_1.checkValidate)(email))
            return res.status(400).json("Email not matched!");
        const newUser = yield (0, authService_1.createUser)({ name, email, password });
        return res.status(200).json(newUser);
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: 'Please enter complete information!'
            });
        }
        const response = yield (0, authService_1.loginUser)(req.body);
        const { refresh_token } = response;
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/'
        });
        return res.status(200).json({
            data: response
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.login = login;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: 'Missing authorization token'
            });
        }
        const response = yield (0, tokenService_1.refreshTokenJwtService)(token);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 200,
            message: 'Logout successfully!'
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.logout = logout;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 400,
                message: 'Missing user ID!'
            });
        }
        const response = yield (0, authService_1.getDetailUser)(userId);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.detail = detail;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { name, image } = req.body;
        if (!userId) {
            return res.status(400).json({
                status: 400,
                message: 'Missing user ID!'
            });
        }
        if (!name) {
            return res.status(400).json({
                status: 400,
                message: 'Bad request!'
            });
        }
        const response = yield (0, authService_1.updateUser)(userId, { name, image });
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.update = update;
