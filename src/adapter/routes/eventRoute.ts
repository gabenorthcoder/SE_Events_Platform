import { Router } from "express";
import { createEventRouter } from "./eventRoutes/createEventRoute";
import { getEventRoute } from "./eventRoutes/getEventsRoute";
import { signUpEventRoute } from "./eventRoutes/signUpEventRoute";

const eventRoutes = Router();

eventRoutes.use(createEventRouter);
eventRoutes.use(getEventRoute);
eventRoutes.use(signUpEventRoute);

export { eventRoutes };
