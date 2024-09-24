import { Context } from "hono";
import { addAuditService, allAuditService, deleteAuditService, oneAuditService, updateAuditService } from "./audits.service";

export const allAuditsController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const audits = await allAuditService(limit);
        if (audits == null || audits.length == 0) {
            return c.text("No audit found", 404);
        }
        return c.json(audits);
    }
    catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }

}

export const oneAuditController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'))
        const audit = await oneAuditService(id);
        if (audit == null) {
            return c.text("Audit not found", 404)
        }
        return c.json(audit, 200);

    } catch (error) {
        throw error;
    }
}

export const addAuditController = async (c: Context) => {
    try {
        const audit = await c.req.json();
        const newAudit = await addAuditService(audit)

        return c.json(newAudit, 200)

    } catch (error) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const updateAuditController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const audit = await c.req.json();

    try {
        const searchedAudit = await oneAuditService(id);
        if (searchedAudit == undefined) return c.text("Audit not found", 404);

        const res = await updateAuditService(id, audit);

        if (!res) return c.text("Audit not updated", 404);

        return c.json({ msg: res }, 201);
    }
    catch (err: any) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const deleteAuditController = async (c: Context) => {
    const id = Number(c.req.param("id"));

    try {
        const audit = await oneAuditService(id);
        if (audit == undefined) return c.text("Audit not found", 404);

        const res = await deleteAuditService(id);
        if (!res) return c.text("Audit not deleted", 404);

        return c.json({ msg: res }, 201);

    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}