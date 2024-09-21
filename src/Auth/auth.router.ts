import { Hono } from 'hono';
import { registerController, } from './auth.controller';
import { zValidator } from '@hono/zod-validator';
import { registerSchema } from '../validators';

export const authRouter = new Hono();

authRouter.post('/register', zValidator('json', registerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), registerController);


export default authRouter;