import { Hono } from "hono";
import { getAllUsersController, oneUserController, updateUserController, deleteUserController, userPartnerController } from "./users.controller";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const usersRouter = new Hono();

usersRouter.get("/users", getAllUsersController);

usersRouter.get("/users/:id", oneUserController)

usersRouter.put("/user/update/:id", updateUserController)

usersRouter.delete("/user/delete/:id", deleteUserController)

usersRouter.get("/user/partner/:id", userPartnerController)