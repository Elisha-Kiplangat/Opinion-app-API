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

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const createSurveySchema = z.object({
    created_by: z.number(),
    title: z.string(),
    description: z.string(),
    status: z.enum(['active', 'inactive']),
    reward: z.number(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for created_at',
    }).transform((val) => new Date(val)).optional().optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional().optional(),
});

export const createQuestionSchema = z.object({
    survey_id: z.number().nonnegative({ message: "Survey ID must be a non-negative integer" }),
    question_text: z.string().min(1, { message: "Question text is required" }).max(255, { message: "Question text must not exceed 255 characters" }),
    question_type: z.enum(['multiple_choice', 'text', 'rating', 'boolean']),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for created_at',
    }).transform((val) => new Date(val)).optional().optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional().optional(),
});

export const createChoiceSchema = z.object({
    question_id: z.number(),
    choice_text: z.string(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for created_at',
    }).transform((val) => new Date(val)).optional().optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional().optional(),
});