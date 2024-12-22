import { Router } from "express";
import passport from "passport";
import { GoogleAuthUseCase } from "../../../application/useCases/googleAuthUseCase";
import { User } from "../../../infrastructure/repository/entities/user";
import logger from "../../../utils/logger";

const google = Router();
const googleCallBack = Router();

google.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

googleCallBack.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    try {
      // `req.user` is already mapped to your User entity
      const user = req.user as User; // Ensure proper typing

      // Use the existing use case to generate a JWT for the authenticated user
      const useCase = new GoogleAuthUseCase();
      const loggedUser = await useCase.authenticateUser(user);

      // Respond with the JWT token and user details
      res.json({
        message: "Login successful",
        loggedUser,
      });
    } catch (error) {
      logger.error("Error during Google authentication:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export { google, googleCallBack };
