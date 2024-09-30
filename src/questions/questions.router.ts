import { Hono } from "hono";
import { deleteQuestionController, allQuestionsController, oneQuestionController, updateQuestionController, addQuestionController } from "./questions.controller";
import { zValidator } from "@hono/zod-validator";
import { createQuestionSchema } from "../validators";
import { adminRoleAuth, allRoleAuth, adminPartnerRoleAuth } from "../middleware/bearAuth";

export const questionsRouter = new Hono();

questionsRouter.get("/questions", adminRoleAuth, allQuestionsController);

questionsRouter.get("/questions/:id", allRoleAuth, oneQuestionController)

questionsRouter.post('/questions/create', adminPartnerRoleAuth, zValidator('json', createQuestionSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addQuestionController);

questionsRouter.put("/questions/update/:id", adminPartnerRoleAuth, updateQuestionController)

questionsRouter.delete("/questions/delete/:id", adminPartnerRoleAuth, deleteQuestionController)