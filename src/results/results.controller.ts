import { Context } from "hono";
import { addResultService, allResultService, deleteResultService, oneResultService, updateResultService } from "./results.service";

export const allResultsController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const results = await allResultService(limit);
        if (results == null || results.length == 0) {
            return c.text("No result found", 404);
        }
        return c.json(results);
    }
    catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }

}

export const oneResultController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'))
        const result = await oneResultService(id);
        if (result == null) {
            return c.text("Result not found", 404)
        }
        return c.json(result, 200);

    } catch (error) {
        throw error;
    }
}

export const addResultController = async (c: Context) => {
    try {
        const result = await c.req.json();
        const newResult = await addResultService(result)

        return c.json(newResult, 200)

    } catch (error) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const updateResultController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const result = await c.req.json();

    try {
        const searchedResult = await oneResultService(id);
        if (searchedResult == undefined) return c.text("Result not found", 404);

        const res = await updateResultService(id, result);

        if (!res) return c.text("Result not updated", 404);

        return c.json({ msg: res }, 201);
    }
    catch (err: any) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const deleteResultController = async (c: Context) => {
    const id = Number(c.req.param("id"));

    try {
        const result = await oneResultService(id);
        if (result == undefined) return c.text("Result not found", 404);

        const res = await deleteResultService(id);
        if (!res) return c.text("Result not deleted", 404);

        return c.json({ msg: res }, 201);

    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}