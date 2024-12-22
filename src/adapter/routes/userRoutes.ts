import { Router } from "express";
import { registrationRoute } from "./userRoutes/userRegistrationRoute";
import { loginRoute } from "./userRoutes/userLoginRoute";
import { listUserEventsRoute } from "./userRoutes/listUserEventsRoute";

const userRoutes = Router();
userRoutes.use(registrationRoute);
userRoutes.use(loginRoute);
userRoutes.use(listUserEventsRoute);

export { userRoutes };
