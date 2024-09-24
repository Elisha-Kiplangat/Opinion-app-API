import { Hono } from "hono";
import { deleteAuditController, allAuditsController, oneAuditController, updateAuditController, addAuditController } from "./audits.controller";
import { zValidator } from "@hono/zod-validator";
import { auditLogSchema } from "../validators";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const auditsRouter = new Hono();

auditsRouter.get("/audit-logs", allAuditsController);

auditsRouter.get("/audit-logs/:id", oneAuditController)

auditsRouter.post('/audit-logs/create', zValidator('json', auditLogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addAuditController);

auditsRouter.put("/audit-logs/update/:id", updateAuditController)

auditsRouter.delete("/audit-logs/delete/:id", deleteAuditController)