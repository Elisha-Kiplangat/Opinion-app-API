import { sql } from "drizzle-orm";
import db from "../drizzle/db";
import { authTable, usersTable, partnersTable } from "../drizzle/schema";
import bcrypt from 'bcrypt';
import mailFunction from "../mail/register";

export interface TuserDetails {
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
}

export interface Tlogin {
    userId: number;
    token: string;
    user: string;
    role: "admin" | "user" | "partner" | null;
}

export const register = async (user: TuserDetails, password: string) => {
    try {
        // If the role is "partner", validate that all required partner details are provided
        if (user.role === 'partner') {
            if (!user.company_name || !user.company_address || !user.company_contact || !user.company_email) {
                throw new Error('Partner details are required for users with the role "partner".');
            }
        }

        // Insert user details into the usersTable
        const userDetails: any = {
            full_name: user.full_name,
            email: user.email,
            contact: user.contact,
            address: user.address,
            role: user.role || 'user',
            created_at: user.created_at || new Date(),
            updated_at: user.updated_at || new Date(),
        };

        const result = await db.insert(usersTable).values(userDetails).returning({ user_id: usersTable.user_id });
        const user_id = result[0].user_id;

        // Hash password and insert into the authTable
        const hashedPassword = await bcrypt.hash(password, 10);
        const authDetails: any = {
            user_id,
            password: hashedPassword,
            created_at: user.created_at || new Date(),
            updated_at: user.updated_at || new Date(),
        };

        await db.insert(authTable).values(authDetails);
        await mailFunction(user.email, 'Registration Successful', JSON.stringify(user));


        // If the user role is "partner", insert partner details into the partnersTable
        if (user.role === 'partner') {
            const partnerDetails: any = {
                user_id,
                company_name: user.company_name!,
                company_address: user.company_address!,
                company_contact: user.company_contact!,
                company_email: user.company_email!,
                created_at: user.created_at || new Date(),
                updated_at: user.updated_at || new Date(),
            };

            await db.insert(partnersTable).values(partnerDetails);
            await mailFunction(user.email, 'Registration Successful', JSON.stringify(user));
            
        }

        return 'User registered successfully';

    } catch (error) {
        throw error;
    }
};

export const login = async (email: string) => {
    return await db.query.usersTable.findFirst({
        columns: {
            user_id: true,
            email: true,
            role: true,
        },
        where: sql `${usersTable.email} = ${email}` 
    })
}

export const auth = async (user_id: number) => {
    return await db.query.authTable.findFirst({
        columns: {
            password: true,
        },
        where: sql `${authTable.user_id} =  ${user_id}`
    })
}
