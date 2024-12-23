import { Request, Response, NextFunction } from "express";

export interface SuperUser {
  firstName: string;
  role: string;
}
export const authorizeSuperAdminRole = (authRole: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Ensure user is set (by validateToken)
    const user = req.user as SuperUser;

    if (!user.role) {
      res
        .status(401)
        .json({ message: "Unauthorized: Super Admin role missing" });
      return;
    }

    // Check if the user's role is in the allowed roles
    if (user.role !== authRole) {
      res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
      return;
    }

    // Role is authorized; proceed to the next middleware/route
    next();
  };
};
