import { Context } from "hono";
import { addSurveyService, allSurveyService, deleteSurveyService, oneSurveyService, surveyQuizService, updateSurveyService } from "./surveys.service";

export const allSurveysController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const surveys = await allSurveyService(limit);
        if (surveys == null || surveys.length == 0) {
            return c.text("No survey found", 404);
        }
        return c.json(surveys);
    }
    catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }

}

export const oneSurveyController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'))
        const survey = await oneSurveyService(id);
        if (survey == null) {
            return c.text("Survey not found", 404)
        }
        return c.json(survey, 200);

    } catch (error) {
        throw error;
    }
}

export const addSurveyController = async (c: Context) => {
    try {
        const survey = await c.req.json();
        const newSurvey = await addSurveyService(survey)

        return c.json(newSurvey, 200)

    } catch (error) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const updateSurveyController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const survey = await c.req.json();

    try {
        const searchedUser = await oneSurveyService(id);
        if (searchedUser == undefined) return c.text("Survey not found", 404);

        const res = await updateSurveyService(id, survey);

        if (!res) return c.text("Survey not updated", 404);

        return c.json({ msg: res }, 201);
    }
    catch (err: any) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const deleteSurveyController = async (c: Context) => {
    const id = Number(c.req.param("id"));

    try {
        const survey = await oneSurveyService(id);
        if (survey == undefined) return c.text("Survey not found", 404);

        const res = await deleteSurveyService(id);
        if (!res) return c.text("Survey not deleted", 404);

        return c.json({ msg: res }, 201);

    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const surveyQuizController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text ("Invalid id");

    const survey = await surveyQuizService(id);
    if (survey == null) {
        return c.text("User not found", 404)
    }
    return c.json(survey, 200)

}