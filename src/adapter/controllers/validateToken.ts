import { Request, Response, NextFunction } from "express";
import { AuthMiddlewareService } from "../../infrastructure/middleware/authMiddlewareService";
import { UserRole } from "../../infrastructure/repository/entities/user";
import { Payload } from "../../infrastructure/authService";

declare global {
  namespace Express {
    interface Request {
      user?: Payload; // Extend the Express Request type to include `user`
    }
  }
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const result = AuthMiddlewareService.verifyToken(token);
  console.log(result);

  if (result.valid && result.decoded) {
    // Attach decoded token to the request object
    req.user = result.decoded; // `req.user` will now hold the `Payload`
    next();
  } else {
    res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};
