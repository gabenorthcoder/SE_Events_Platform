import { Router } from "express";
import { dashboard } from "../../controllers/userDashboardController";
import { validateToken } from "../../controllers/validateToken";
import { authorizeRole } from "../../controllers/authorizeUser";
import { UserRole } from "../../../infrastructure/repository/entities/user";

const userInfoRoute = Router();
/**
 * @openapi
 * /auth/dashboard:
 *   get:
 *     summary: Access protected user dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully accessed the protected dashboard.
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *     403:
 *        description: Unauthorized - Invalid token.
 */
userInfoRoute.get(
  "/dashboard",
  validateToken,
  authorizeRole([UserRole.USER, UserRole.STAFF]),
  dashboard
);

export { userInfoRoute };
