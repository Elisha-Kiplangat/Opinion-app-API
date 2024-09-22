import { Context } from "hono";
import { auth, login, register } from "./auth.service";
import bcrypt from 'bcrypt';
import { sign } from "hono/jwt";


interface addRequest {
    full_name: string;
    email: string;
    contact: string;
    address: string;
    role: 'user' | 'admin' | 'partner';
    company_name?: string;
    company_address?: string;
    company_contact?: string;
    company_email?: string;
    created_at?: Date;
    updated_at?: Date;
    password: string;
}

export const registerController = async (c: Context): Promise<Response> => {
    try {
        const { full_name, email, contact, address, role, company_name, company_address, company_contact, company_email, created_at, updated_at, password }: addRequest = await c.req.json();

        // Pass the user details and password to the register function
        const userDetails = {
            full_name,
            email,
            contact,
            address,
            role: role || 'user',
            company_name,
            company_address,
            company_contact,
            company_email,
            created_at,
            updated_at,
            password
        };

        const message = await register(userDetails, password);
        return c.json({ message }, 201);

    } catch (error: any) {
        return c.json({ message: 'Error adding user', error: error.message }, 500);
    }
};


export const loginController = async (c: Context) => {
    try {
        const {email, password } = await c.req.json();

        const userExist = await login(email)
        if (!userExist) return c.json({error: 'User not found'}, 404);

        const authExist = await auth(userExist.user_id);
        if (!authExist) return c.json({ error: 'Auth details not found'}, 404);

        const authMatch = await bcrypt.compare(password, authExist.password as string);
        if (!authMatch) return c.json({error: 'Invalid credentials'}, 401);

        const payload = {
            sub: userExist.email,
            role: userExist.role,
            user_id: userExist.user_id,
            exp: Math.floor(Date.now() / 1000) + 60 * 180
        }

        const secret = process.env.JWT_SECRET as string
        const token = await sign(payload, secret);

        let user = userExist?.email;
        let role = userExist?.role;
        let userId = userExist?.user_id;
        return c.json({ userId, token, role, user }, 200);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
