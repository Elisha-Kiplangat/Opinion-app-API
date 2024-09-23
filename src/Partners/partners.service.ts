import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { partnerInsert, partnerSelect, partnersTable } from "../drizzle/schema";

export const getPartnerService = async (limit?: number): Promise<partnerSelect[]> => {
    try {
        if (limit) {
            const partners = await db.query.partnersTable.findMany({
                limit: limit
            });
            return partners;
        }
        return await db.query.partnersTable.findMany();
        
    } catch (error) {
        throw (error)
    }
}

export const onePartnerService = async (id: number): Promise<partnerSelect | undefined> => {
    return await db.query.partnersTable.findFirst({
        where: eq(partnersTable.partner_id, id)
    })
        
}

export const updatePartnerService = async (id: number, partner: partnerInsert) => {
    try {
        const partnerSearched = await onePartnerService(id);
        if (!partnerSearched) {
            return false;
        }
        await db.update(partnersTable).set(partner).where(eq(partnersTable.partner_id, id));
        return "Partner updated successfully"
    }
    catch (err) {
        throw err;
    }

}

export const deletePartnerService = async (id: number) => {
    await db.delete(partnersTable).where(eq(partnersTable.partner_id, id));

    return "Partner deleted successfully"
}