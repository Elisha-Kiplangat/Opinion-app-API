import { Context } from "hono";
import { register } from "./auth.service";

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
