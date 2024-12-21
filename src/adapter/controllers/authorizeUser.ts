import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../infrastructure/repository/entities/user";

export const authorizeRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Ensure user is set (by validateToken)
    const user = req.user;
    if (!user) {
      res
        .status(401)
        .json({ message: "Unauthorized: User information missing" });
      return;
    }

    // Check if the user's role is in the allowed roles
    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
      return;
    }

    // Role is authorized; proceed to the next middleware/route
    next();
  };
};
