import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { messageInsert, messageSelect, messagesTable } from "../drizzle/schema";

export const allMessageService = async (limit: number): Promise<messageSelect[]> => {
    try {
        if (limit) {
            const messages = await db.query.messagesTable.findMany({
                limit: limit
            })
            return messages;
        }
        return await db.query.messagesTable.findMany();

    } catch (error) {
        throw error;
    }
}

export const oneMessageService = async (id: number): Promise<messageSelect | undefined> => {
    try {
        return await db.query.messagesTable.findFirst({
            where: eq(messagesTable.message_id, id)
        })

    } catch (error) {
        throw error;
    }
}

export const addMessageService = async (message: messageInsert) => {
    await db.insert(messagesTable).values(message);
    return "Message added successfully"
}

export const updateMessageService = async (id: number, message: messageInsert) => {
    try {
        const messageSearched = await oneMessageService(id);
        if (!messageSearched) {
            return false;
        }
        await db.update(messagesTable).set(message).where(eq(messagesTable.message_id, id));
        return "Message updated successfully"
    }
    catch (err) {
        throw err;
    }

}

export const deleteMessageService = async (id: number) => {
    await db.delete(messagesTable).where(eq(messagesTable.message_id, id));

    return "Message deleted successfully"
}