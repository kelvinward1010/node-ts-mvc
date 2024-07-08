import express from "express";
import { detail, login, logout, refreshToken, register, update } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";

export const routerAuth = express.Router();

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

routerAuth.post("/sign-up", register);
routerAuth.post("/sign-in", login);
routerAuth.post("/refresh-token", refreshToken);
routerAuth.post("/sign-out", logout);
routerAuth.get("/get-user-detail/:id", authenticateToken, detail);
routerAuth.put("/update-user/:id", authenticateToken, update);
