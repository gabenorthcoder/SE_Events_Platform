import { Router } from "express";
import { loginRoute } from "./userRoutes/userLoginRoute";
import { listUserEventsRoute } from "./userRoutes/listUserEventsRoute";
import { registerRoute } from "./userRoutes/userRegisterRoute";

const userRoutes = Router();
userRoutes.use(loginRoute);
userRoutes.use(listUserEventsRoute);
userRoutes.use(registerRoute);

export { userRoutes };
