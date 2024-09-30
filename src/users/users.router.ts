import { Hono } from "hono";
import { getAllUsersController, oneUserController, updateUserController, deleteUserController, userPartnerController, userSurveyPaymentController, userMessageController, userPartnerRequestController, userSupportController } from "./users.controller";
import { adminPartnerRoleAuth, adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const usersRouter = new Hono();

usersRouter.get("/users", adminRoleAuth, getAllUsersController);

usersRouter.get("/users/:id", allRoleAuth, oneUserController)

usersRouter.put("/user/update/:id", allRoleAuth, updateUserController)

usersRouter.delete("/user/delete/:id", allRoleAuth,  deleteUserController)

usersRouter.get("/user/partner/:id", adminPartnerRoleAuth, userPartnerController)

usersRouter.get("/users/surveys/payments/:id", allRoleAuth, userSurveyPaymentController)

usersRouter.get("/users/messages/:id", allRoleAuth, userMessageController)

usersRouter.get("/users/partners/requests/:id", adminPartnerRoleAuth, userPartnerRequestController)

usersRouter.get("/users/support/:id", allRoleAuth, userSupportController)