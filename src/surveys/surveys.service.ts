import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { surveyInsert, surveySelect, surveysTable } from "../drizzle/schema";

export const allSurveyService = async (limit: number): Promise<surveySelect[]> => {
    try {
        if (limit) {
            const surveys = await db.query.surveysTable.findMany({
                limit: limit
            })
            return surveys;
        }
        return await db.query.surveysTable.findMany();
        
    } catch (error) {
        throw error;
    }
}

export const oneSurveyService = async (id : number): Promise<surveySelect | undefined> => {
    try {
        return await db.query.surveysTable.findFirst({
            where: eq(surveysTable.survey_id, id)
        })

    } catch (error) {
        throw error;
    }
}

export const addSurveyService = async (survey: surveyInsert) => {
    await db.insert(surveysTable).values(survey);
    return "Survey added successfully"
}

export const updateSurveyService = async (id: number, survey: surveyInsert) => {
    try {
        const surveySearched = await oneSurveyService(id);
        if (!surveySearched) {
            return false;
        }
        await db.update(surveysTable).set(survey).where(eq(surveysTable.survey_id, id));
        return "Survey updated successfully"
    }
    catch (err) {
        throw err;
    }

}

export const deleteSurveyService = async (id: number) => {
    await db.delete(surveysTable).where(eq(surveysTable.survey_id, id));

    return "Survey deleted successfully"
}