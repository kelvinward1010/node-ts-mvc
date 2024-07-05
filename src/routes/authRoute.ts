import * as express from "express";
import { register } from "../controllers/AuthController";

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
