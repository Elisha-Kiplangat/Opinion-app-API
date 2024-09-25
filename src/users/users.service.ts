import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { authTable, userInsert, userSelect, usersTable } from "../drizzle/schema";
import { TUserMessage, TUserPartner, TUserPartnerRequest, TUserSupport, TUserSurveyPayment } from "../types";

export const getAllUserService = async (limit?: number): Promise<userSelect[]> => {
    try {
        if (limit) {
            const users = await db.query.usersTable.findMany({
                limit: limit
            })
            return users;
        }
        return await db.query.usersTable.findMany();

    }
    catch (err) {
        throw err;
    }
}

export const oneUserService = async (id: number): Promise<userSelect | undefined> => {
    return await db.query.usersTable.findFirst({
        where: eq (usersTable.user_id, id)
    });
}

// export const addUserService = async (user: userSelect) => {
//     await db.insert(usersTable).values(user);
//     return "User added successfully"
// }

export const updateUserService = async (id: number, user: userInsert) => {
    try {
        const userSearched = await oneUserService(id);
        if (!userSearched) {
            return false;
        }
        await db.update(usersTable).set(user).where(eq(usersTable.user_id, id));
        return "User updated successfully"
    }
    catch (err) {
        throw err;
    }
}

export const deleteUserService = async (id: number) => {
    await db.delete(authTable).where(eq(authTable.user_id, id));
    await db.delete(usersTable).where(eq(usersTable.user_id, id));

    return "User deleted successfully"
}

export const userPartnerService = async (id: number): Promise<TUserPartner | undefined> => {
    return await db.query.usersTable.findFirst({
        columns: {
            user_id: true,
            full_name: true,
            email: true,
        },
        with: {
            partner: {
                columns: {
                    company_name: true,
                    company_email: true,
                    company_address: true,
                    company_contact: true,
                }
            }
        },
        where: eq(usersTable.user_id, id)
    });
};

export const userSurveyPaymentService = async (id: number): Promise<TUserSurveyPayment | undefined> => {
    return await db.query.usersTable.findFirst({
        columns: {
            user_id: true,
            full_name: true,
            email: true,
        },
        with: {
            surveys: {
                columns: {
                    title: true,
                    status: true,
                    reward: true
                }
            },
            payments: {
                columns: {
                    payment_status: true,
                    transaction_id: true,
                    payment_date: true,
                    amount: true
                }
            }
        },
        where: eq(usersTable.user_id, id)
    });
}

export const userMessageService = async (id: number): Promise<TUserMessage | undefined> => {
    return await db.query.usersTable.findFirst({
        columns: {
            user_id: true,
            full_name: true,
            email: true,
        },
        with: {
            messages: {
                columns: {
                    subject: true,
                    message_body: true,
                    status: true
                }
            },
        },
        where: eq(usersTable.user_id, id)
    });
}

export const userPartnerRequestService = async (id: number): Promise<TUserPartnerRequest | undefined> => {
    return await db.query.usersTable.findFirst({
        columns: {
            user_id: true,
            full_name: true,
            email: true,
        },
        with: {
            partner: {
                columns: {
                    company_name: true,
                    company_email: true,
                    company_address: true,
                    company_contact: true,
                }
            },
            clientRequests: {
                columns: {
                    requested_survey_title: true,
                    status: true
                }
            }
        },
        where: eq(usersTable.user_id, id)
    });
}

export const userSupportService = async (id: number): Promise<TUserSupport | undefined> => {
    return await db.query.usersTable.findFirst({
        columns: {
            user_id: true,
            full_name: true,
            email: true,
        },
        with: {
            userSupportTickets: {
                columns: {
                    subject: true,
                    description: true,
                    status: true,
                    resolved_by: true,
                    resolved_at: true
                }
            }
        },
        where: eq(usersTable.user_id, id)
    })
}
