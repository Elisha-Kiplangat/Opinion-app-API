import { Hono } from "hono";
import { deletePaymentController, allPaymentsController, onePaymentController, updatePaymentController, addPaymentController } from "./payments.controller";
import { zValidator } from "@hono/zod-validator";
import { PaymentSchema } from "../validators";
import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const paymentsRouter = new Hono();

paymentsRouter.get("/payments", adminRoleAuth, allPaymentsController);

paymentsRouter.get("/payments/:id", allRoleAuth, onePaymentController)

paymentsRouter.post('/payments/create', allRoleAuth, zValidator('json', PaymentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addPaymentController);

paymentsRouter.put("/payments/update/:id", adminRoleAuth, updatePaymentController)

paymentsRouter.delete("/payments/delete/:id", adminRoleAuth, deletePaymentController)