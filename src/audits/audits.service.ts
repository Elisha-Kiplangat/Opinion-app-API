import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { auditLogInsert, auditLogSelect, auditLogsTable } from "../drizzle/schema";

export const allAuditService = async (limit: number): Promise<auditLogSelect[]> => {
    try {
        if (limit) {
            const audits = await db.query.auditLogsTable.findMany({
                limit: limit
            })
            return audits;
        }
        return await db.query.auditLogsTable.findMany();

    } catch (error) {
        throw error;
    }
}

export const oneAuditService = async (id: number): Promise<auditLogSelect | undefined> => {
    try {
        return await db.query.auditLogsTable.findFirst({
            where: eq(auditLogsTable.log_id, id)
        })

    } catch (error) {
        throw error;
    }
}

export const addAuditService = async (audit: auditLogInsert) => {
    await db.insert(auditLogsTable).values(audit);
    return "Audit added successfully"
}

export const updateAuditService = async (id: number, audit: auditLogInsert) => {
    try {
        const auditSearched = await oneAuditService(id);
        if (!auditSearched) {
            return false;
        }
        await db.update(auditLogsTable).set(audit).where(eq(auditLogsTable.log_id, id));
        return "Audit updated successfully"
    }
    catch (err) {
        throw err;
    }

}

export const deleteAuditService = async (id: number) => {
    await db.delete(auditLogsTable).where(eq(auditLogsTable.log_id, id));

    return "Audit deleted successfully"
}