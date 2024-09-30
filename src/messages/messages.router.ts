import { Hono } from "hono";
import { deleteMessageController, allMessagesController, oneMessageController, updateMessageController, addMessageController } from "./messages.controller";
import { zValidator } from "@hono/zod-validator";
import { messageSchema } from "../validators";
import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const messagesRouter = new Hono();

messagesRouter.get("/messages", adminRoleAuth, allMessagesController);

messagesRouter.get("/messages/:id", allRoleAuth, oneMessageController)

messagesRouter.post('/messages/create', allRoleAuth, zValidator('json', messageSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addMessageController);

messagesRouter.put("/messages/update/:id", adminRoleAuth, updateMessageController)

messagesRouter.delete("/messages/delete/:id", adminRoleAuth, deleteMessageController)