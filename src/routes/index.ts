import express from "express";
import { routerAuth } from "./authRoute";
import { routerPost } from "./postRoute";
import { routerProduct } from "./productRoute";
import { routerUser } from "./userRoute";

export const routes = (app: express.Application) => {
    app.use("/api/auth", routerAuth);
    app.use("/api/user", routerUser);
    app.use("/api/post", routerPost);
    app.use("/api/product", routerProduct);
};
