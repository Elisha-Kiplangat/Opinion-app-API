import { Context } from "hono";
import { addMessageService, allMessageService, deleteMessageService, oneMessageService, updateMessageService } from "./messages.service";

export const allMessagesController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const messages = await allMessageService(limit);
        if (messages == null || messages.length == 0) {
            return c.text("No message found", 404);
        }
        return c.json(messages);
    }
    catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }

}

export const oneMessageController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'))
        const message = await oneMessageService(id);
        if (message == null) {
            return c.text("Message not found", 404)
        }
        return c.json(message, 200);

    } catch (error) {
        throw error;
    }
}

export const addMessageController = async (c: Context) => {
    try {
        const message = await c.req.json();
        const newMessage = await addMessageService(message)

        return c.json(newMessage, 200)

    } catch (error) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const updateMessageController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const message = await c.req.json();

    try {
        const searchedMessage = await oneMessageService(id);
        if (searchedMessage == undefined) return c.text("Message not found", 404);

        const res = await updateMessageService(id, message);

        if (!res) return c.text("Message not updated", 404);

        return c.json({ msg: res }, 201);
    }
    catch (err: any) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const deleteMessageController = async (c: Context) => {
    const id = Number(c.req.param("id"));

    try {
        const message = await oneMessageService(id);
        if (message == undefined) return c.text("Message not found", 404);

        const res = await deleteMessageService(id);
        if (!res) return c.text("Message not deleted", 404);

        return c.json({ msg: res }, 201);

    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}