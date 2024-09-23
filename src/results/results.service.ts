import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { surveyResultInsert, surveyResultSelect, surveyResultsTable } from "../drizzle/schema";

export const allResultService = async (limit: number): Promise<surveyResultSelect[]> => {
    try {
        if (limit) {
            const results = await db.query.surveyResultsTable.findMany({
                limit: limit
            })
            return results;
        }
        return await db.query.surveyResultsTable.findMany();

    } catch (error) {
        throw error;
    }
}

export const oneResultService = async (id: number): Promise<surveyResultSelect | undefined> => {
    try {
        return await db.query.surveyResultsTable.findFirst({
            where: eq(surveyResultsTable.result_id, id)
        })

    } catch (error) {
        throw error;
    }
}

export const addResultService = async (result: surveyResultInsert) => {
    await db.insert(surveyResultsTable).values(result);
    return "Result added successfully"
}

export const updateResultService = async (id: number, result: surveyResultInsert) => {
    try {
        const resultSearched = await oneResultService(id);
        if (!resultSearched) {
            return false;
        }
        await db.update(surveyResultsTable).set(result).where(eq(surveyResultsTable.result_id, id));
        return "Result updated successfully"
    }
    catch (err) {
        throw err;
    }

}

export const deleteResultService = async (id: number) => {
    await db.delete(surveyResultsTable).where(eq(surveyResultsTable.result_id, id));

    return "Result deleted successfully"
}