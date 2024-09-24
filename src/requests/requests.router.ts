import { Hono } from "hono";
import { deleteRequestController, allRequestsController, oneRequestController, updateRequestController, addRequestController } from "./requests.controller";
import { zValidator } from "@hono/zod-validator";
import { requestSchema } from "../validators";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const requestsRouter = new Hono();

requestsRouter.get("/requests", allRequestsController);

requestsRouter.get("/requests/:id", oneRequestController)

requestsRouter.post('/requests/create', zValidator('json', requestSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addRequestController);

requestsRouter.put("/requests/update/:id", updateRequestController)

requestsRouter.delete("/requests/delete/:id", deleteRequestController)