import { Router } from "express";
import { getEvents } from "../../controllers/eventAccess/getEvents";
import { validateToken } from "../../controllers/middleware/validateToken";
import { authorizeRole } from "../../controllers/middleware/authorizeUser";
import { UserRole } from "../../../infrastructure/repository/entities/user";

const getEventRoute = Router();

/**
 * @openapi
 * /events/read:
 *   get:
 *     summary: Fetch all active events
 *     description: Retrieve a list of all active events.
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: A list of active events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Art Workshop"
 *                   description:
 *                     type: string
 *                     example: "An engaging art workshop for all ages"
 *                   location:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         example: 40.73061
 *                       lon:
 *                         type: number
 *                         example: -73.935242
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-20"
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   createdBy:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       email:
 *                         type: string
 *                         example: "staff@example.com"
 *       500:
 *         description: Failed to fetch events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch events"
 */

getEventRoute.get(
  "/read",
  validateToken,
  authorizeRole([UserRole.USER, UserRole.ADMIN, UserRole.STAFF]),
  getEvents
);

export { getEventRoute };
