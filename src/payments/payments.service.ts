import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { paymentInsert, paymentSelect, paymentsTable } from "../drizzle/schema";

export const allPaymentService = async (limit: number): Promise<paymentSelect[]> => {
    try {
        if (limit) {
            const payments = await db.query.paymentsTable.findMany({
                limit: limit
            })
            return payments;
        }
        return await db.query.paymentsTable.findMany();

    } catch (error) {
        throw error;
    }
}

export const onePaymentService = async (id: number): Promise<paymentSelect | undefined> => {
    try {
        return await db.query.paymentsTable.findFirst({
            where: eq(paymentsTable.payment_id, id)
        })

    } catch (error) {
        throw error;
    }
}

export const addPaymentService = async (payment: paymentInsert) => {
    await db.insert(paymentsTable).values(payment);
    return "Payment added successfully"
}

export const updatePaymentService = async (id: number, payment: paymentInsert) => {
    try {
        const paymentSearched = await onePaymentService(id);
        if (!paymentSearched) {
            return false;
        }
        await db.update(paymentsTable).set(payment).where(eq(paymentsTable.payment_id, id));
        return "Payment updated successfully"
    }
    catch (err) {
        throw err;
    }

}

export const deletePaymentService = async (id: number) => {
    await db.delete(paymentsTable).where(eq(paymentsTable.payment_id, id));

    return "Payment deleted successfully"
}