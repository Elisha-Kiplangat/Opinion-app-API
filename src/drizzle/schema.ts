import { relations } from 'drizzle-orm'
import { decimal, integer, pgEnum, pgTable, serial, text, timestamp, varchar, json } from 'drizzle-orm/pg-core'


export const roleEnum = pgEnum('role', ['admin', 'user', 'partner'])
export const surveyStatusEnum = pgEnum('status', ['active', 'inactive'])
export const questionEnum = pgEnum('question', ['text', 'multiple_choice', 'rating', 'boolean'])
export const paymentEnum = pgEnum('payment', ['pending', 'completed', 'failed'])
export const messageStatusEnum = pgEnum('messageStatus', ['sent', 'read'])
export const requestStatusEnum = pgEnum('request', ['pending', 'approved', 'rejected'])
export const supportStatusEnum = pgEnum('support', ['open', 'in_progress', 'resolved', 'closed'])


export const usersTable = pgTable ('users', {
    user_id: serial("user_id").primaryKey(),
    full_name: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    contact: varchar("contact", { length: 20 }).unique().notNull(),
    address: text("address").notNull(),
    role: roleEnum("role").default("user"),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString())
});

export const partnersTable = pgTable('partners', {
    partner_id: serial("partner_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => usersTable.user_id),
    company_name: varchar("company_name", { length: 255 }).notNull().unique(),
    company_address: text("company_address").notNull(),
    company_contact: varchar("company_contact", { length: 20 }).notNull(),
    company_email: varchar("company_email", { length: 255 }).notNull().unique(),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString())
});

export const authTable = pgTable ('auth', {
    auth_id: serial("auth_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => usersTable.user_id),
    password: varchar("password", {length: 255}).notNull(),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString())

});

export const surveysTable = pgTable ('surveys', {
    survey_id: serial("survey_id").primaryKey(),
    created_by: integer("created_by").notNull().references(() => usersTable.user_id),
    title: varchar("title", {length: 255}).notNull(),
    description: varchar("description", {length: 255}).notNull(),
    status: surveyStatusEnum("status").default("active"),
    reward: decimal("reward", { precision: 10, scale: 2 }).notNull().default('0'),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString())
});

export const questionsTable =  pgTable ('questions', {
    question_id: serial('question_id').primaryKey(),
    survey_id: integer('survey_id').notNull().references(() => surveysTable.survey_id),
    question_text: varchar('question_text', {length: 255}).notNull(),
    question_type: questionEnum('question_type').notNull(),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString())
});

export const choicesTable = pgTable('choices', {
    choice_id: serial('choice_id').primaryKey(),
    question_id: integer('question_id').notNull().references(() => questionsTable.question_id),
    choice_text: varchar('choice_text', { length: 255 }).notNull(),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString())
});

export const answersTable = pgTable('answers', {
    answer_id: serial('answer_id').primaryKey(),
    question_id: integer('question_id').notNull().references(() => questionsTable.question_id),
    user_id: integer('user_id').notNull().references(() => usersTable.user_id),
    answer_text: varchar('answer_text', { length: 255 }),
    choice_id: integer('choice_id').references(() => choicesTable.choice_id),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString())
});

export const surveyResultsTable = pgTable('survey_results', {
    result_id: serial('result_id').primaryKey(),
    survey_id: integer('survey_id').notNull().references(() => surveysTable.survey_id),
    submitted_by: integer('submitted_by').notNull().references(() => usersTable.user_id),
    submitted_at: timestamp('submitted_at', { mode: 'string' }).notNull().defaultNow(),
    result_data: json('result_data').notNull()
});

export const paymentsTable = pgTable('payments', {
    payment_id: serial('payment_id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => usersTable.user_id),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    payment_status: paymentEnum('payment_status').notNull(),
    payment_method: varchar('payment_method', { length: 50 }).notNull(),
    transaction_id: varchar('transaction_id', { length: 255 }).unique().notNull(),
    payment_date: timestamp('payment_date', { mode: 'string' }),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString()),
});

export const messagesTable = pgTable('messages', {
    message_id: serial('message_id').primaryKey(),
    from_user_id: integer('from_user_id').notNull().references(() => usersTable.user_id),
    to_user_id: integer('to_user_id').notNull().references(() => usersTable.user_id),
    subject: varchar('subject', { length: 255 }).notNull(),
    message_body: text('message_body').notNull(),
    status: messageStatusEnum('status').notNull().default('sent'),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString())
});

export const clientRequestsTable = pgTable('client_requests', {
    request_id: serial('request_id').primaryKey(),
    client_partner_id: integer('client_partner_id').notNull().references(() => usersTable.user_id),
    requested_survey_title: varchar('requested_survey_title', { length: 255 }).notNull(),
    status: requestStatusEnum('status').notNull().default('pending'),
    requested_at: timestamp("requested_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString())
});

export const auditLogsTable = pgTable('audit_logs', {
    log_id: serial('log_id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => usersTable.user_id),
    action: varchar('action', { length: 255 }).notNull(),
    description: text('description').notNull(),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString())
});

export const userSupportTable = pgTable('user_support', {
    ticket_id: serial('ticket_id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => usersTable.user_id),
    subject: varchar('subject', { length: 255 }).notNull(),
    description: text('description').notNull(),
    status: supportStatusEnum('status').notNull().default('open'),
    resolved_by: integer('resolved_by').references(() => usersTable.user_id),
    resolved_at: timestamp('resolved_at', { mode: 'string' }),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdateFn(() => new Date().toISOString())
});

// Relationships

export const usersTableRelation = relations(usersTable, ({ one, many }) => ({
    authentication: one(authTable, {
        fields: [usersTable.user_id],
        references: [authTable.user_id]
    }),
    partner: one(partnersTable, {
        fields: [usersTable.user_id],
        references: [partnersTable.user_id],
    }),
    surveys: many(surveysTable),
    // messagesSent: many(messagesTable),
    messages: many(messagesTable),
    answers: many(answersTable),
    surveyResults: many(surveyResultsTable),
    payments: many(paymentsTable),
    clientRequests: many(clientRequestsTable),
    auditLogs: many(auditLogsTable),
    userSupportTickets: many(userSupportTable),
    supportResolvedBy: many(userSupportTable),
}));

export const authTableRelation = relations(authTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [authTable.user_id],
        references: [usersTable.user_id]
    }),
}));

export const partnersTableRelation = relations(partnersTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [partnersTable.user_id],
        references: [usersTable.user_id],
    }),
}));


export const surveysTableRelation = relations(surveysTable, ({ one, many }) => ({
    createdBy: one(usersTable, {
        fields: [surveysTable.created_by],
        references: [usersTable.user_id]
    }),
    payment: one(paymentsTable,{
        fields: [surveysTable.reward],
        references: [paymentsTable.amount]
    }),
    questions: many(questionsTable),
    results: many(surveyResultsTable),
}));

export const questionsTableRelation = relations(questionsTable, ({ one, many }) => ({
    survey: one(surveysTable, {
        fields: [questionsTable.survey_id],
        references: [surveysTable.survey_id]
    }),
    choices: many(choicesTable),
    answers: many(answersTable),
}));

export const choicesTableRelation = relations(choicesTable, ({ one }) => ({
    question: one(questionsTable, {
        fields: [choicesTable.question_id],
        references: [questionsTable.question_id]
    }),
}));

export const answersTableRelation = relations(answersTable, ({ one }) => ({
    question: one(questionsTable, {
        fields: [answersTable.question_id],
        references: [questionsTable.question_id]
    }),
    user: one(usersTable, {
        fields: [answersTable.user_id],
        references: [usersTable.user_id]
    }),
    choice: one(choicesTable, {
        fields: [answersTable.choice_id],
        references: [choicesTable.choice_id]
    }),
}));

export const surveyResultsTableRelation = relations(surveyResultsTable, ({ one }) => ({
    survey: one(surveysTable, {
        fields: [surveyResultsTable.survey_id],
        references: [surveysTable.survey_id]
    }),
    submittedBy: one(usersTable, {
        fields: [surveyResultsTable.submitted_by],
        references: [usersTable.user_id]
    }),
}));

export const paymentsTableRelation = relations(paymentsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [paymentsTable.user_id],
        references: [usersTable.user_id]
    }),
}));

export const messagesTableRelation = relations(messagesTable, ({ one }) => ({
    User: one(usersTable, {
        fields: [messagesTable.from_user_id],
        references: [usersTable.user_id]
    })
    
}));

export const clientRequestsTableRelation = relations(clientRequestsTable, ({ one }) => ({
    clientPartner: one(usersTable, {
        fields: [clientRequestsTable.client_partner_id],
        references: [usersTable.user_id]
    }),
}));

export const auditLogsTableRelation = relations(auditLogsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [auditLogsTable.user_id],
        references: [usersTable.user_id]
    }),
}));

export const userSupportTableRelation = relations(userSupportTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [userSupportTable.user_id],
        references: [usersTable.user_id]
    })
}));


//types

export type userInsert = typeof usersTable.$inferInsert;
export type userSelect = typeof usersTable.$inferSelect;

export type authInsert = typeof authTable.$inferInsert;
export type authSelect = typeof authTable.$inferSelect;

export type partnerInsert = typeof partnersTable.$inferInsert;
export type partnerSelect = typeof partnersTable.$inferSelect;

export type surveyInsert = typeof surveysTable.$inferInsert;
export type surveySelect = typeof surveysTable.$inferSelect;

export type questionInsert = typeof questionsTable.$inferInsert;
export type questionSelect = typeof questionsTable.$inferSelect;

export type choiceInsert = typeof choicesTable.$inferInsert;
export type choiceSelect = typeof choicesTable.$inferSelect;

export type answerInsert = typeof answersTable.$inferInsert;
export type answerSelect = typeof answersTable.$inferSelect;

export type surveyResultInsert = typeof surveyResultsTable.$inferInsert;
export type surveyResultSelect = typeof surveyResultsTable.$inferSelect;

export type paymentInsert = typeof paymentsTable.$inferInsert;
export type paymentSelect = typeof paymentsTable.$inferSelect;

export type messageInsert = typeof messagesTable.$inferInsert;
export type messageSelect = typeof messagesTable.$inferSelect;

export type clientRequestInsert = typeof clientRequestsTable.$inferInsert;
export type clientRequestSelect = typeof clientRequestsTable.$inferSelect;

export type auditLogInsert = typeof auditLogsTable.$inferInsert;
export type auditLogSelect = typeof auditLogsTable.$inferSelect;

export type userSupportInsert = typeof userSupportTable.$inferInsert;
export type userSupportSelect = typeof userSupportTable.$inferSelect;

