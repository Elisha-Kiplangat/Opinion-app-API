import { Hono } from "hono";
import { deleteAnswerController, allAnswersController, oneAnswerController, updateAnswerController, addAnswerController } from "./answers.controller";
import { zValidator } from "@hono/zod-validator";
import { answerSchema } from "../validators";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const answersRouter = new Hono();

answersRouter.get("/answers", allAnswersController);

answersRouter.get("/answers/:id", oneAnswerController)

answersRouter.post('/answers/create', zValidator('json', answerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addAnswerController);

answersRouter.put("/answers/update/:id", updateAnswerController)

answersRouter.delete("/answers/delete/:id", deleteAnswerController)