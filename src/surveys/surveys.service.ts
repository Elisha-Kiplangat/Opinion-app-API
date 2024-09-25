import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { surveyInsert, surveySelect, surveysTable } from "../drizzle/schema";
import { TSurveyQuiz } from "../types";

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

export const surveyQuizService = async (id: number): Promise<TSurveyQuiz | undefined> => {
    return await db.query.surveysTable.findFirst({
        columns: {
            title: true,
            description: true,
            status: true,
            reward: true,
        },
        with: {
            questions: {
                columns: {
                    question_text: true,
                    question_type: true
                }
            }
        },
        where: eq(surveysTable.survey_id, id)
    });
}
// survey payment !!!!!!
export const surveyPaymentService = async (id: number) => {
    return await db.query.surveysTable.findFirst({
        columns: {
            title: true,
            description: true,
            status: true,
            reward: true,
        },
        with: {
            payment: {
                columns: {
                    amount: true,
                    payment_status: true,
                    payment_method: true,
                    transaction_id: true,
                    payment_date: true
                }
            }
        },
        where: eq(surveysTable.survey_id, id)
    });
}