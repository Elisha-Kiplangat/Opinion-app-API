import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { answerInsert, answerSelect, answersTable } from "../drizzle/schema";

export const allAnswerService = async (limit: number): Promise<answerSelect[]> => {
    try {
        if (limit) {
            const answers = await db.query.answersTable.findMany({
                limit: limit
            })
            return answers;
        }
        return await db.query.answersTable.findMany();

    } catch (error) {
        throw error;
    }
}

export const oneAnswerService = async (id: number): Promise<answerSelect | undefined> => {
    try {
        return await db.query.answersTable.findFirst({
            where: eq(answersTable.answer_id, id)
        })

    } catch (error) {
        throw error;
    }
}

export const addAnswerService = async (answer: answerInsert) => {
    await db.insert(answersTable).values(answer);
    return "Answer added successfully"
}

export const updateAnswerService = async (id: number, answer: answerInsert) => {
    try {
        const answerSearched = await oneAnswerService(id);
        if (!answerSearched) {
            return false;
        }
        await db.update(answersTable).set(answer).where(eq(answersTable.answer_id, id));
        return "Answer updated successfully"
    }
    catch (err) {
        throw err;
    }

}

export const deleteAnswerService = async (id: number) => {
    await db.delete(answersTable).where(eq(answersTable.answer_id, id));

    return "Answer deleted successfully"
}