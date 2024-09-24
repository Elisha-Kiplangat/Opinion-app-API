import { Hono } from "hono";
import { deleteMessageController, allMessagesController, oneMessageController, updateMessageController, addMessageController } from "./messages.controller";
import { zValidator } from "@hono/zod-validator";
import { messageSchema } from "../validators";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const messagesRouter = new Hono();

messagesRouter.get("/messages", allMessagesController);

messagesRouter.get("/messages/:id", oneMessageController)

messagesRouter.post('/messages/create', zValidator('json', messageSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addMessageController);

messagesRouter.put("/messages/update/:id", updateMessageController)

messagesRouter.delete("/messages/delete/:id", deleteMessageController)