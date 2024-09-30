import { Hono } from "hono";
import { deleteSurveyController, allSurveysController, oneSurveyController, updateSurveyController, addSurveyController, surveyQuizController, surveyPaymentController, surveyResultsController } from "./surveys.controller";
import { zValidator } from "@hono/zod-validator";
import { createSurveySchema } from "../validators";
import { adminRoleAuth, adminPartnerRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const surveysRouter = new Hono();

surveysRouter.get("/surveys", adminPartnerRoleAuth, allSurveysController);

surveysRouter.get("/surveys/:id", adminPartnerRoleAuth, oneSurveyController)

surveysRouter.post('/survey/create', adminPartnerRoleAuth, zValidator('json', createSurveySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addSurveyController);

surveysRouter.put("/survey/update/:id", adminPartnerRoleAuth, updateSurveyController)

surveysRouter.delete("/survey/delete/:id", adminPartnerRoleAuth, deleteSurveyController)

surveysRouter.get("/surveys/quiz/:id", adminPartnerRoleAuth, surveyQuizController)

surveysRouter.get("/surveys/payments/:id", adminRoleAuth, surveyPaymentController)

surveysRouter.get("/survey/results/:id", adminRoleAuth, surveyResultsController)