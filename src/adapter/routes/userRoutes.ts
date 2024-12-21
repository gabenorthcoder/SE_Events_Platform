import { Router } from "express";
import { registrationRoute } from "./userRoutes/userRegistrationRoute";
import { loginRoute } from "./userRoutes/userLoginRoute";

const userRoutes = Router();

userRoutes.use(registrationRoute);
userRoutes.use(loginRoute);

export { userRoutes };
