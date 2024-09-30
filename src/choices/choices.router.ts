import { Hono } from "hono";
import { deleteChoiceController, allChoicesController, oneChoiceController, updateChoiceController, addChoiceController } from "./choices.controller";
import { zValidator } from "@hono/zod-validator";
import { createChoiceSchema } from "../validators";
import { adminPartnerRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const choicesRouter = new Hono();

choicesRouter.get("/choices", adminPartnerRoleAuth, allChoicesController);

choicesRouter.get("/choices/:id", allRoleAuth, oneChoiceController)

choicesRouter.post('/choices/create', adminPartnerRoleAuth, zValidator('json', createChoiceSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addChoiceController);

choicesRouter.put("/choices/update/:id", adminPartnerRoleAuth, updateChoiceController)

choicesRouter.delete("/choices/delete/:id", adminPartnerRoleAuth, deleteChoiceController)