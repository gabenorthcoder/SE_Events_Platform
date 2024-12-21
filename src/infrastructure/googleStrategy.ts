import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserRepository } from "./repository/userRepository";

passport.use(
  new GoogleStrategy(
    {
      clientID: String(process.env.GOOGLE_CLIENT_ID)!,
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)!,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const userRepository = new UserRepository();

      try {
        const email = profile.emails?.[0].value || "";
        let user = await userRepository.findUserByEmail(email);

        if (!user) {
          user = await userRepository.createUser({
            email,
            firstName: profile.name?.givenName || "GoogleUser",
            lastName: profile.name?.familyName || "GoogleUser",
            password: "",
            role: 1,
          });
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
