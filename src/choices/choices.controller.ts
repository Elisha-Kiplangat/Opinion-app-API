import { Context } from "hono";
import { addChoiceService, allChoiceService, deleteChoiceService, oneChoiceService, updateChoiceService } from "./choices.service";

export const allChoicesController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const choices = await allChoiceService(limit);
        if (choices == null || choices.length == 0) {
            return c.text("No choice found", 404);
        }
        return c.json(choices);
    }
    catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }

}

export const oneChoiceController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'))
        const choice = await oneChoiceService(id);
        if (choice == null) {
            return c.text("Choice not found", 404)
        }
        return c.json(choice, 200);

    } catch (error) {
        throw error;
    }
}

export const addChoiceController = async (c: Context) => {
    try {
        const choice = await c.req.json();
        const newChoice = await addChoiceService(choice)

        return c.json(newChoice, 200)

    } catch (error) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const updateChoiceController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const choice = await c.req.json();

    try {
        const searchedChoice = await oneChoiceService(id);
        if (searchedChoice == undefined) return c.text("Choice not found", 404);

        const res = await updateChoiceService(id, choice);

        if (!res) return c.text("Choice not updated", 404);

        return c.json({ msg: res }, 201);
    }
    catch (err: any) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const deleteChoiceController = async (c: Context) => {
    const id = Number(c.req.param("id"));

    try {
        const choice = await oneChoiceService(id);
        if (choice == undefined) return c.text("Choice not found", 404);

        const res = await deleteChoiceService(id);
        if (!res) return c.text("Choice not deleted", 404);

        return c.json({ msg: res }, 201);

    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}