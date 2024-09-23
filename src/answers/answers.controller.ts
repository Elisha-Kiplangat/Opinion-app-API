import { Context } from "hono";
import { addAnswerService, allAnswerService, deleteAnswerService, oneAnswerService, updateAnswerService } from "./answers.service";

export const allAnswersController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const answers = await allAnswerService(limit);
        if (answers == null || answers.length == 0) {
            return c.text("No answer found", 404);
        }
        return c.json(answers);
    }
    catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }

}

export const oneAnswerController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'))
        const answer = await oneAnswerService(id);
        if (answer == null) {
            return c.text("Answer not found", 404)
        }
        return c.json(answer, 200);

    } catch (error) {
        throw error;
    }
}

export const addAnswerController = async (c: Context) => {
    try {
        const answer = await c.req.json();
        const newAnswer = await addAnswerService(answer)

        return c.json(newAnswer, 200)

    } catch (error) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const updateAnswerController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const answer = await c.req.json();

    try {
        const searchedAnswer = await oneAnswerService(id);
        if (searchedAnswer == undefined) return c.text("Answer not found", 404);

        const res = await updateAnswerService(id, answer);

        if (!res) return c.text("Answer not updated", 404);

        return c.json({ msg: res }, 201);
    }
    catch (err: any) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const deleteAnswerController = async (c: Context) => {
    const id = Number(c.req.param("id"));

    try {
        const answer = await oneAnswerService(id);
        if (answer == undefined) return c.text("Answer not found", 404);

        const res = await deleteAnswerService(id);
        if (!res) return c.text("Answer not deleted", 404);

        return c.json({ msg: res }, 201);

    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}