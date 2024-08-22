"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const authRoute_1 = require("./authRoute");
const postRoute_1 = require("./postRoute");
const routes = (app) => {
    app.use('/api/auth', authRoute_1.routerAuth);
    app.use('/api/post', postRoute_1.routerPost);
};
exports.routes = routes;
