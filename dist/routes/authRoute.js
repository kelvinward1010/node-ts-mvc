"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.routerAuth = express_1.default.Router();
/**
 * @openapi
 * /api/auth/sign-up:
 *  post:
 *   description: Sign up
 *   tags:
 *    - Authentication
 *   summary: Register a user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserRegistration'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UserRegistrationResponse'
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
*/
exports.routerAuth.post("/sign-up", authController_1.register);
exports.routerAuth.post("/sign-in", authController_1.login);
exports.routerAuth.post("/refresh-token", authController_1.refreshToken);
exports.routerAuth.post("/sign-out", authController_1.logout);
exports.routerAuth.get("/get-user-detail/:id", authMiddleware_1.authenticateToken, authController_1.detail);
exports.routerAuth.put("/update-user/:id", authMiddleware_1.authenticateToken, authController_1.update);
