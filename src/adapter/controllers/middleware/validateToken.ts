import { Request, Response, NextFunction } from "express";
import { AuthMiddlewareService } from "../../../infrastructure/middleware/authMiddlewareService";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Extend the Express Request type to include `user`
    }
  }
}

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }
  const token = authHeader.split(" ")[1];
  const authMiddlewareService = new AuthMiddlewareService();
  const result = await authMiddlewareService.verifyToken(token);

  if (result.valid && result.user) {
    // Attach decoded token to the request object
    req.user = result.user; // `req.user` will now hold the `Payload`
    next();
  } else {
    res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};
