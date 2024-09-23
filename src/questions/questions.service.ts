import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { questionInsert, questionSelect, questionsTable } from "../drizzle/schema";

export const allQuestionService = async (limit: number): Promise<questionSelect[]> => {
    try {
        if (limit) {
            const questions = await db.query.questionsTable.findMany({
                limit: limit
            })
            return questions;
        }
        return await db.query.questionsTable.findMany();

    } catch (error) {
        throw error;
    }
}

export const oneQuestionService = async (id: number): Promise<questionSelect | undefined> => {
    try {
        return await db.query.questionsTable.findFirst({
            where: eq(questionsTable.question_id, id)
        })

    } catch (error) {
        throw error;
    }
}

export const addQuestionService = async (question: questionInsert) => {
    await db.insert(questionsTable).values(question);
    return "Question added successfully"
}

export const updateQuestionService = async (id: number, question: questionInsert) => {
    try {
        const questionSearched = await oneQuestionService(id);
        if (!questionSearched) {
            return false;
        }
        await db.update(questionsTable).set(question).where(eq(questionsTable.question_id, id));
        return "Question updated successfully"
    }
    catch (err) {
        throw err;
    }

}

export const deleteQuestionService = async (id: number) => {
    await db.delete(questionsTable).where(eq(questionsTable.question_id, id));

    return "Question deleted successfully"
}