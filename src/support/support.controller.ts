import { Context } from "hono";
import { addSupportService, allSupportService, deleteSupportService, oneSupportService, updateSupportService } from "./support.service";

export const allSupportsController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const supports = await allSupportService(limit);
        if (supports == null || supports.length == 0) {
            return c.text("No support found", 404);
        }
        return c.json(supports);
    }
    catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }

}

export const oneSupportController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'))
        const support = await oneSupportService(id);
        if (support == null) {
            return c.text("Support not found", 404)
        }
        return c.json(support, 200);

    } catch (error) {
        throw error;
    }
}

export const addSupportController = async (c: Context) => {
    try {
        const support = await c.req.json();
        const newSupport = await addSupportService(support)

        return c.json(newSupport, 200)

    } catch (error) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const updateSupportController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const support = await c.req.json();

    try {
        const searchedSupport = await oneSupportService(id);
        if (searchedSupport == undefined) return c.text("Support not found", 404);

        const res = await updateSupportService(id, support);

        if (!res) return c.text("Support not updated", 404);

        return c.json({ msg: res }, 201);
    }
    catch (err: any) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const deleteSupportController = async (c: Context) => {
    const id = Number(c.req.param("id"));

    try {
        const support = await oneSupportService(id);
        if (support == undefined) return c.text("Support not found", 404);

        const res = await deleteSupportService(id);
        if (!res) return c.text("Support not deleted", 404);

        return c.json({ msg: res }, 201);

    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}