import { Router } from "express";
import { createEventRouter } from "./eventRoutes/createEventRoute";
import { getEventRoute } from "./eventRoutes/getEventsRoute";
import { signUpEventRoute } from "./eventRoutes/signUpEventRoute";
import { updateEventRoute } from "./eventRoutes/updateEventRoute";
import { deleteEventRoute } from "./eventRoutes/deleteEventRoute";

const eventRoutes = Router();

eventRoutes.use(createEventRouter);
eventRoutes.use(getEventRoute);
eventRoutes.use(signUpEventRoute);
eventRoutes.use(updateEventRoute);
eventRoutes.use(deleteEventRoute);

export { eventRoutes };
