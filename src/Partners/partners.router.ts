import { Hono } from "hono";
import { deletePartnerController, getPartnersController, onePartnerController, updatePartnerController } from "./partners.controller";
import { adminRoleAuth, adminPartnerRoleAuth, partnerRoleAuth } from "../middleware/bearAuth";

export const partnersRouter = new Hono();

partnersRouter.get("/partners", adminRoleAuth, getPartnersController);

partnersRouter.get("/partners/:id", adminPartnerRoleAuth, onePartnerController)

partnersRouter.put("/partner/update/:id", partnerRoleAuth, updatePartnerController)

partnersRouter.delete("/partner/delete/:id", adminPartnerRoleAuth, deletePartnerController)