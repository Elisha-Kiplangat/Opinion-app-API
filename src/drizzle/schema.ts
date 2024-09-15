import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'


export const roleEnum = pgEnum('role', ['admin', 'user', 'partner'])
export const statusEnum = pgEnum('status', ['active', 'inactive'])
export const questionEnum = pgEnum('question', ['text', 'multiple_choice', 'checkbox'])


export const usersTable = pgTable ('users', {
    user_id: serial("user_id").primaryKey(),
    full_name: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    contact_phone: varchar("contact_phone", { length: 20 }).notNull(),
    address: text("address").notNull(),
    role: roleEnum("role").default("user"),
    company_name: varchar("company_name", {length: 255}),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow()
});

export const authTable = pgTable ('auth', {
    auth_id: serial("auth_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => usersTable.user_id),
    password: varchar("password", {length: 255}).notNull(),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow()

});

export const surveysTable = pgTable ('surveys', {
    survey_id: serial("survey_id").primaryKey(),
    created_by: varchar("created_by", {length: 255}).notNull().references(() => usersTable.user_id),
    title: varchar("title", {length: 255}).notNull(),
    description: varchar("description", {length: 255}).notNull(),
    status: statusEnum("status").default("active"),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow()
});

export const questionsTable =  pgTable ('questions', {
    question_id: serial('question_id').primaryKey(),
    survey_id: integer('survey_id').notNull().references(() => surveysTable.survey_id),
    question_text: varchar('question_text', {length: 255}).notNull(),
    question_type: questionEnum('question_type').notNull(),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow()
});