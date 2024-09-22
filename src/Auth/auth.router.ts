import { Hono } from 'hono';
import { loginController, registerController, } from './auth.controller';
import { zValidator } from '@hono/zod-validator';
import { loginSchema, registerSchema } from '../validators';

export const authRouter = new Hono();

authRouter.post('/register', zValidator('json', registerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), registerController);

authRouter.post('/login', zValidator('json', loginSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), loginController);

export default authRouter;