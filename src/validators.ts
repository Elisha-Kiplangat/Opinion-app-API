import { z } from 'zod'

export const registerSchema = z.object({
    full_name: z.string(),
    email: z.string().email(),
    contact: z.string(),
    address: z.string(),
    role: z.string().optional(),
    company_name: z.string().optional(),
    company_address: z.string().optional(),
    company_contact: z.string().optional(),
    company_email: z.string().optional(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for created_at',
    }).transform((val) => new Date(val)).optional().optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional().optional(),
    password: z.string()
});