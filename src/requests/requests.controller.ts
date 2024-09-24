import { Context } from "hono";
import { addRequestService, allRequestService, deleteRequestService, oneRequestService, updateRequestService } from "./requests.service";

export const allRequestsController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const requests = await allRequestService(limit);
        if (requests == null || requests.length == 0) {
            return c.text("No request found", 404);
        }
        return c.json(requests);
    }
    catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }

}

export const oneRequestController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'))
        const request = await oneRequestService(id);
        if (request == null) {
            return c.text("Request not found", 404)
        }
        return c.json(request, 200);

    } catch (error) {
        throw error;
    }
}

export const addRequestController = async (c: Context) => {
    try {
        const request = await c.req.json();
        const newRequest = await addRequestService(request)

        return c.json(newRequest, 200)

    } catch (error) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const updateRequestController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const request = await c.req.json();

    try {
        const searchedRequest = await oneRequestService(id);
        if (searchedRequest == undefined) return c.text("Request not found", 404);

        const res = await updateRequestService(id, request);

        if (!res) return c.text("Request not updated", 404);

        return c.json({ msg: res }, 201);
    }
    catch (err: any) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const deleteRequestController = async (c: Context) => {
    const id = Number(c.req.param("id"));

    try {
        const request = await oneRequestService(id);
        if (request == undefined) return c.text("Request not found", 404);

        const res = await deleteRequestService(id);
        if (!res) return c.text("Request not deleted", 404);

        return c.json({ msg: res }, 201);

    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}