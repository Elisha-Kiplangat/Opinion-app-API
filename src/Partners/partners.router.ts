import { Hono } from "hono";
import { deletePartnerController, getPartnersController, onePartnerController, updatePartnerController } from "./partners.controller";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const partnersRouter = new Hono();

partnersRouter.get("/partners", getPartnersController);

partnersRouter.get("/partners/:id", onePartnerController)

partnersRouter.put("/partner/update/:id", updatePartnerController)

partnersRouter.delete("/partner/delete/:id", deletePartnerController)