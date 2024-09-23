import { Context } from "hono";
import { deletePartnerService, getPartnerService, onePartnerService, updatePartnerService } from "./partners.service";

export const getPartnersController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const partners = await getPartnerService(limit);
        if (partners == null || partners.length == 0) {
            return c.text("No partner found", 404);
        }
        return c.json(partners);
    }
    catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }

}

export const onePartnerController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const partner = await onePartnerService(id);
    if (partner == null) {
        return c.text("Partner not found", 404);
    }
    return c.json(partner, 200);

}

export const updatePartnerController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const partner = await c.req.json();

    try {
        const searchedUser = await onePartnerService(id);
        if (searchedUser == undefined) return c.text("Partner not found", 404);

        const res = await updatePartnerService(id, partner);

        if (!res) return c.text("Partner not updated", 404);

        return c.json({ msg: res }, 201);
    }
    catch (err: any) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const deletePartnerController = async (c: Context) => {
    const id = Number(c.req.param("id"));
    
    try {
        const partner = await onePartnerService(id);
        if (partner == undefined) return c.text("Partner not found", 404);

        const res = await deletePartnerService(id);
        if (!res) return c.text("Partner not deleted", 404);

        return c.json({ msg: res }, 201);

    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}