import { Hono } from "hono";
import { deleteQuestionController, allQuestionsController, oneQuestionController, updateQuestionController, addQuestionController } from "./questions.controller";
import { zValidator } from "@hono/zod-validator";
import { createQuestionSchema } from "../validators";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const questionsRouter = new Hono();

questionsRouter.get("/questions", allQuestionsController);

questionsRouter.get("/questions/:id", oneQuestionController)

questionsRouter.post('/questions/create', zValidator('json', createQuestionSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addQuestionController);

questionsRouter.put("/questions/update/:id", updateQuestionController)

questionsRouter.delete("/questions/delete/:id", deleteQuestionController)