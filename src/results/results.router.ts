import { Hono } from "hono";
import { deleteResultController, allResultsController, oneResultController, updateResultController, addResultController } from "./results.controller";
import { zValidator } from "@hono/zod-validator";
import { resultSchema } from "../validators";
import { adminRoleAuth, adminPartnerRoleAuth } from "../middleware/bearAuth";

export const resultsRouter = new Hono();

resultsRouter.get("/results", adminRoleAuth, allResultsController);

resultsRouter.get("/results/:id", adminPartnerRoleAuth, oneResultController)

resultsRouter.post('/results/create', adminRoleAuth, zValidator('json', resultSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addResultController);

resultsRouter.put("/results/update/:id", adminRoleAuth, updateResultController)

resultsRouter.delete("/results/delete/:id", adminRoleAuth, deleteResultController)