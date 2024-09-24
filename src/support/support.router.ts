import { Hono } from "hono";
import { deleteSupportController, allSupportsController, oneSupportController, updateSupportController, addSupportController } from "./support.controller";
import { zValidator } from "@hono/zod-validator";
import { supportSchema } from "../validators";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const supportRouter = new Hono();

supportRouter.get("/support-tickets", allSupportsController);

supportRouter.get("/support-tickets/:id", oneSupportController)

supportRouter.post('/support-tickets/create', zValidator('json', supportSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addSupportController);

supportRouter.put("/support-tickets/update/:id", updateSupportController)

supportRouter.delete("/support-tickets/delete/:id", deleteSupportController)