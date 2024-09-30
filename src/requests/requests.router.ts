import { Hono } from "hono";
import { deleteRequestController, allRequestsController, oneRequestController, updateRequestController, addRequestController } from "./requests.controller";
import { zValidator } from "@hono/zod-validator";
import { requestSchema } from "../validators";
import { adminRoleAuth, allRoleAuth, adminPartnerRoleAuth } from "../middleware/bearAuth";

export const requestsRouter = new Hono();

requestsRouter.get("/requests", adminRoleAuth, allRequestsController);

requestsRouter.get("/requests/:id", adminPartnerRoleAuth, oneRequestController)

requestsRouter.post('/requests/create', adminPartnerRoleAuth, zValidator('json', requestSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addRequestController);

requestsRouter.put("/requests/update/:id", adminPartnerRoleAuth, updateRequestController)

requestsRouter.delete("/requests/delete/:id", adminPartnerRoleAuth, deleteRequestController)