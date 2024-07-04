import express from 'express';
import { routerAuth } from './authRoute';



export const routes = (app: express.Application) => {
    app.use('/api/auth', routerAuth)
}