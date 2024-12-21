import { Router } from "express";
import { userInfoRoute } from "./protectedRoutes/userInfoRoute";

const protectedRoutes = Router();

protectedRoutes.use(userInfoRoute);

export { protectedRoutes };
