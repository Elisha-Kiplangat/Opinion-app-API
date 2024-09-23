import { Context } from "hono";
import { addQuestionService, allQuestionService, deleteQuestionService, oneQuestionService, updateQuestionService } from "./questions.service";

export const allQuestionsController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const questions = await allQuestionService(limit);
        if (questions == null || questions.length == 0) {
            return c.text("No question found", 404);
        }
        return c.json(questions);
    }
    catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }

}

export const oneQuestionController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'))
        const question = await oneQuestionService(id);
        if (question == null) {
            return c.text("Question not found", 404)
        }
        return c.json(question, 200);

    } catch (error) {
        throw error;
    }
}

export const addQuestionController = async (c: Context) => {
    try {
        const question = await c.req.json();
        const newQuestion = await addQuestionService(question)

        return c.json(newQuestion, 200)

    } catch (error) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const updateQuestionController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const question = await c.req.json();

    try {
        const searchedQuestion = await oneQuestionService(id);
        if (searchedQuestion == undefined) return c.text("Question not found", 404);

        const res = await updateQuestionService(id, question);

        if (!res) return c.text("Question not updated", 404);

        return c.json({ msg: res }, 201);
    }
    catch (err: any) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const deleteQuestionController = async (c: Context) => {
    const id = Number(c.req.param("id"));

    try {
        const question = await oneQuestionService(id);
        if (question == undefined) return c.text("Question not found", 404);

        const res = await deleteQuestionService(id);
        if (!res) return c.text("Question not deleted", 404);

        return c.json({ msg: res }, 201);

    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}