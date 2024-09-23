import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { choiceInsert, choiceSelect, choicesTable } from "../drizzle/schema";

export const allChoiceService = async (limit: number): Promise<choiceSelect[]> => {
    try {
        if (limit) {
            const choices = await db.query.choicesTable.findMany({
                limit: limit
            })
            return choices;
        }
        return await db.query.choicesTable.findMany();

    } catch (error) {
        throw error;
    }
}

export const oneChoiceService = async (id: number): Promise<choiceSelect | undefined> => {
    try {
        return await db.query.choicesTable.findFirst({
            where: eq(choicesTable.choice_id, id)
        })

    } catch (error) {
        throw error;
    }
}

export const addChoiceService = async (choice: choiceInsert) => {
    await db.insert(choicesTable).values(choice);
    return "Choice added successfully"
}

export const updateChoiceService = async (id: number, choice: choiceInsert) => {
    try {
        const choiceSearched = await oneChoiceService(id);
        if (!choiceSearched) {
            return false;
        }
        await db.update(choicesTable).set(choice).where(eq(choicesTable.choice_id, id));
        return "Choice updated successfully"
    }
    catch (err) {
        throw err;
    }

}

export const deleteChoiceService = async (id: number) => {
    await db.delete(choicesTable).where(eq(choicesTable.choice_id, id));

    return "Choice deleted successfully"
}