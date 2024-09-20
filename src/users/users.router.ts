import { Hono } from "hono";
import { getAllUsersController, oneUserController, addUserController, updateUserController, deleteUserController } from "./users.controller";
// import { zValidator } from "@hono/zod-validator";
// import { userSchema } from "../validators";
// import { adminRoleAuth, allRoleAuth } from "../middleware/bearAuth";

export const usersRouter = new Hono();

usersRouter.get("/users", getAllUsersController);

usersRouter.get("/users/:id", oneUserController)


// usersRouter.post("/users", adminRoleAuth, zValidator('json', userSchema, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400)
//     }
// }), addUserController)

usersRouter.put("/user/update/:id", updateUserController)

usersRouter.delete("/user/delete/:id", deleteUserController)