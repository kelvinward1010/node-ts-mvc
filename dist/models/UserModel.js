"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    image: { type: "string" },
}, { timestamps: true });
exports.userModel = mongoose_1.default.model("User", userSchema);
/**
 * @openapi
 * components:
 *  schemas:
 *   UserRegistration:
 *    type: object
 *    required:
 *     - email
 *     - name
 *     - password
 *    properties:
 *     name:
 *      type: string
 *      default: Kelvin Ward
 *     email:
 *      type: string
 *      default: kelvin@gmail.com
 *     password:
 *      type: string
 *      default: 123456ok
 *   UserRegistrationResponse:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *     name:
 *      type: string
 *     email:
 *      type: string
 *     image:
 *      type: string
 *     createdAt:
 *      type: string
 *     updatedAt:
 *      type: string
*/ 
