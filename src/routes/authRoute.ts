import * as express from "express";
import { register } from "../controllers/AuthController";

export const routerAuth = express.Router();

routerAuth.post('/sign-up', register)