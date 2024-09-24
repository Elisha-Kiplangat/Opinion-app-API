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
    }).transform((val) => new Date(val)).optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional(),
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
    }).transform((val) => new Date(val)).optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional(),
});

export const createQuestionSchema = z.object({
    survey_id: z.number().nonnegative({ message: "Survey ID must be a non-negative integer" }),
    question_text: z.string().min(1, { message: "Question text is required" }).max(255, { message: "Question text must not exceed 255 characters" }),
    question_type: z.enum(['multiple_choice', 'text', 'rating', 'boolean']),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for created_at',
    }).transform((val) => new Date(val)).optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional(),
});

export const createChoiceSchema = z.object({
    question_id: z.number(),
    choice_text: z.string(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for created_at',
    }).transform((val) => new Date(val)).optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional(),
});

export const answerSchema = z.object({
    question_id: z.number(),
    user_id: z.number(),
    choice_id: z.number(),
    answer_text: z.string(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for created_at',
    }).transform((val) => new Date(val)).optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional(),
});

export const resultSchema = z.object({
    survey_id: z.number(),
    submitted_by: z.number(),
    submitted_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for submitted_at',
    }).transform((val) => new Date(val)).optional(),
});

export const PaymentSchema = z.object({
    user_id: z.number(),
    amount: z.number(),
    payment_status: z.enum(['pending', 'completed', 'failed']),
    payment_method: z.string(),
    transaction_id: z.string(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for created_at',
    }).transform((val) => new Date(val)).optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional(),
});

export const messageSchema = z.object({
    from_user_id: z.number(),
    to_user_id: z.number(),
    subject: z.string(),
    message_body: z.string(),
    status: z.enum(['sent', 'read']),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for created_at',
    }).transform((val) => new Date(val)).optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional(),
});

export const requestSchema = z.object({
    client_partner_id: z.number(),
    requested_survey_title: z.string(),
    status: z.enum(['pending', 'approved', 'rejected']),
    requested_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for requested_at',
    }).transform((val) => new Date(val)).optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional(),
});

export const auditLogSchema = z.object({
    user_id: z.number(),
    action: z.string(),
    description: z.string(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for created_at',
    }).transform((val) => new Date(val)).optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional(),
});

export const supportSchema = z.object({
    user_id: z.number(),
    subject: z.string(),
    description: z.string(),
    status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
    resolved_by: z.number().optional(),
    resolved_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for resolved_at',
    }).transform((val) => new Date(val)).optional(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for created_at',
    }).transform((val) => new Date(val)).optional(),
    updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format for updated_at',
    }).transform((val) => new Date(val)).optional(),
});