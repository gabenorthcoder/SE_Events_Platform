import { Router } from "express";
import { loginRoute } from "./userRoutes/userLoginRoute";
import { listUserEventsRoute } from "./userRoutes/listUserEventsRoute";

const userRoutes = Router();
userRoutes.use(loginRoute);
userRoutes.use(listUserEventsRoute);

export { userRoutes };
