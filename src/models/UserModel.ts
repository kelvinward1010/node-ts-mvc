import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: "string", required: true},
    email: {type: "string", required: true, unique: true},
    password: {type: "string", required: true},
    image: {type: "string"},
}, {timestamps: true})


export const userModel = mongoose.model("User", userSchema);

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