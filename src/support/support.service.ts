import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { userSupportInsert, userSupportSelect, userSupportTable } from "../drizzle/schema";

export const allSupportService = async (limit: number): Promise<userSupportSelect[]> => {
    try {
        if (limit) {
            const supports = await db.query.userSupportTable.findMany({
                limit: limit
            })
            return supports;
        }
        return await db.query.userSupportTable.findMany();

    } catch (error) {
        throw error;
    }
}

export const oneSupportService = async (id: number): Promise<userSupportSelect | undefined> => {
    try {
        return await db.query.userSupportTable.findFirst({
            where: eq(userSupportTable.ticket_id, id)
        })

    } catch (error) {
        throw error;
    }
}

export const addSupportService = async (support: userSupportInsert) => {
    await db.insert(userSupportTable).values(support);
    return "Support added successfully"
}

export const updateSupportService = async (id: number, support: userSupportInsert) => {
    try {
        const supportSearched = await oneSupportService(id);
        if (!supportSearched) {
            return false;
        }
        await db.update(userSupportTable).set(support).where(eq(userSupportTable.ticket_id, id));
        return "Support updated successfully"
    }
    catch (err) {
        throw err;
    }

}

export const deleteSupportService = async (id: number) => {
    await db.delete(userSupportTable).where(eq(userSupportTable.ticket_id, id));

    return "Support deleted successfully"
}