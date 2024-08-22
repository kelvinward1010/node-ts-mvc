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
exports.refreshTokenJwtService = exports.generalRefreshToken = exports.generalAccessToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ _id }, jwtkey, { expiresIn: "10d" });
};
exports.createToken = createToken;
const generalAccessToken = (_id) => {
    const jwtkey = process.env.JWT_ACCESSTOKEN;
    return jsonwebtoken_1.default.sign({ _id }, jwtkey, { expiresIn: "15m" });
};
exports.generalAccessToken = generalAccessToken;
const generalRefreshToken = (_id) => {
    const jwtkey = process.env.JWT_REFRESHTOKEN;
    return jsonwebtoken_1.default.sign({ _id }, jwtkey, { expiresIn: "15d" });
};
exports.generalRefreshToken = generalRefreshToken;
const refreshTokenJwtService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtkey = process.env.JWT_REFRESHTOKEN;
        const user = yield jsonwebtoken_1.default.verify(token, jwtkey);
        const access_token = yield generalAccessToken(user === null || user === void 0 ? void 0 : user._id);
        return {
            status: 200,
            message: 'Token refreshed successfully!',
            access_token
        };
    }
    catch (error) {
        return {
            status: 401,
            message: "Unauthorized"
        };
    }
});
exports.refreshTokenJwtService = refreshTokenJwtService;
