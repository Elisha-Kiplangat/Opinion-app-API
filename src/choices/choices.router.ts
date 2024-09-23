import { Hono } from "hono";
import { deleteChoiceController, allChoicesController, oneChoiceController, updateChoiceController, addChoiceController } from "./choices.controller";
import { zValidator } from "@hono/zod-validator";
import { createChoiceSchema } from "../validators";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const choicesRouter = new Hono();

choicesRouter.get("/choices", allChoicesController);

choicesRouter.get("/choices/:id", oneChoiceController)

choicesRouter.post('/choices/create', zValidator('json', createChoiceSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addChoiceController);

choicesRouter.put("/choices/update/:id", updateChoiceController)

choicesRouter.delete("/choices/delete/:id", deleteChoiceController)