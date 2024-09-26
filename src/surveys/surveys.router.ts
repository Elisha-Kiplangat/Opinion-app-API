import { Hono } from "hono";
import { deleteSurveyController, allSurveysController, oneSurveyController, updateSurveyController, addSurveyController, surveyQuizController, surveyPaymentController, surveyResultsController } from "./surveys.controller";
import { zValidator } from "@hono/zod-validator";
import { createSurveySchema } from "../validators";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const surveysRouter = new Hono();

surveysRouter.get("/surveys", allSurveysController);

surveysRouter.get("/surveys/:id", oneSurveyController)

surveysRouter.post('/survey/create', zValidator('json', createSurveySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addSurveyController);

surveysRouter.put("/survey/update/:id", updateSurveyController)

surveysRouter.delete("/survey/delete/:id", deleteSurveyController)

surveysRouter.get("/surveys/quiz/:id", surveyQuizController)

surveysRouter.get("/surveys/payments/:id", surveyPaymentController)

surveysRouter.get("/survey/results/:id", surveyResultsController)