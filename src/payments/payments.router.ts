import { Hono } from "hono";
import { deletePaymentController, allPaymentsController, onePaymentController, updatePaymentController, addPaymentController } from "./payments.controller";
import { zValidator } from "@hono/zod-validator";
import { PaymentSchema } from "../validators";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const paymentsRouter = new Hono();

paymentsRouter.get("/payments", allPaymentsController);

paymentsRouter.get("/payments/:id", onePaymentController)

paymentsRouter.post('/payments/create', zValidator('json', PaymentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addPaymentController);

paymentsRouter.put("/payments/update/:id", updatePaymentController)

paymentsRouter.delete("/payments/delete/:id", deletePaymentController)