import { Hono } from "hono";
import { deleteAuditController, allAuditsController, oneAuditController, updateAuditController, addAuditController } from "./audits.controller";
import { zValidator } from "@hono/zod-validator";
import { auditLogSchema } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";

export const auditsRouter = new Hono();

auditsRouter.get("/audit-logs", adminRoleAuth, allAuditsController);

auditsRouter.get("/audit-logs/:id", adminRoleAuth, oneAuditController)

auditsRouter.post('/audit-logs/create', adminRoleAuth, zValidator('json', auditLogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addAuditController);

auditsRouter.put("/audit-logs/update/:id", adminRoleAuth, updateAuditController)

auditsRouter.delete("/audit-logs/delete/:id", adminRoleAuth, deleteAuditController)