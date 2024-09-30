import { Hono } from "hono";
import { deleteAnswerController, allAnswersController, oneAnswerController, updateAnswerController, addAnswerController } from "./answers.controller";
import { zValidator } from "@hono/zod-validator";
import { answerSchema } from "../validators";
import { adminPartnerRoleAuth } from "../middleware/bearAuth";

export const answersRouter = new Hono();

answersRouter.get("/answers", adminPartnerRoleAuth, allAnswersController);

answersRouter.get("/answers/:id", adminPartnerRoleAuth, oneAnswerController)

answersRouter.post('/answers/create', adminPartnerRoleAuth, zValidator('json', answerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addAnswerController);

answersRouter.put("/answers/update/:id", adminPartnerRoleAuth, updateAnswerController)

answersRouter.delete("/answers/delete/:id", adminPartnerRoleAuth, deleteAnswerController)