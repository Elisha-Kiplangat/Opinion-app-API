import { Context } from "hono";
import { addPaymentService, allPaymentService, deletePaymentService, onePaymentService, updatePaymentService } from "./payments.service";

export const allPaymentsController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const payments = await allPaymentService(limit);
        if (payments == null || payments.length == 0) {
            return c.text("No payment found", 404);
        }
        return c.json(payments);
    }
    catch (err: any) {
        console.error(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }

}

export const onePaymentController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'))
        const payment = await onePaymentService(id);
        if (payment == null) {
            return c.text("Payment not found", 404)
        }
        return c.json(payment, 200);

    } catch (error) {
        throw error;
    }
}

export const addPaymentController = async (c: Context) => {
    try {
        const payment = await c.req.json();
        const newPayment = await addPaymentService(payment)

        return c.json(newPayment, 200)

    } catch (error) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const updatePaymentController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const payment = await c.req.json();

    try {
        const searchedPayment = await onePaymentService(id);
        if (searchedPayment == undefined) return c.text("Payment not found", 404);

        const res = await updatePaymentService(id, payment);

        if (!res) return c.text("Payment not updated", 404);

        return c.json({ msg: res }, 201);
    }
    catch (err: any) {
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}

export const deletePaymentController = async (c: Context) => {
    const id = Number(c.req.param("id"));

    try {
        const payment = await onePaymentService(id);
        if (payment == undefined) return c.text("Payment not found", 404);

        const res = await deletePaymentService(id);
        if (!res) return c.text("Payment not deleted", 404);

        return c.json({ msg: res }, 201);

    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}