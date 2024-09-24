import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { clientRequestInsert, clientRequestSelect, clientRequestsTable } from "../drizzle/schema";

export const allRequestService = async (limit: number): Promise<clientRequestSelect[]> => {
    try {
        if (limit) {
            const requests = await db.query.clientRequestsTable.findMany({
                limit: limit
            })
            return requests;
        }
        return await db.query.clientRequestsTable.findMany();

    } catch (error) {
        throw error;
    }
}

export const oneRequestService = async (id: number): Promise<clientRequestSelect | undefined> => {
    try {
        return await db.query.clientRequestsTable.findFirst({
            where: eq(clientRequestsTable.request_id, id)
        })

    } catch (error) {
        throw error;
    }
}

export const addRequestService = async (request: clientRequestInsert) => {
    await db.insert(clientRequestsTable).values(request);
    return "Request added successfully"
}

export const updateRequestService = async (id: number, request: clientRequestInsert) => {
    try {
        const requestSearched = await oneRequestService(id);
        if (!requestSearched) {
            return false;
        }
        await db.update(clientRequestsTable).set(request).where(eq(clientRequestsTable.request_id, id));
        return "Request updated successfully"
    }
    catch (err) {
        throw err;
    }

}

export const deleteRequestService = async (id: number) => {
    await db.delete(clientRequestsTable).where(eq(clientRequestsTable.request_id, id));

    return "Request deleted successfully"
}