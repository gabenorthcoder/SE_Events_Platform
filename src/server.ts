import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { eventRoutes } from "./adapter/routes/eventRoute";
import { userRoutes } from "./adapter/routes/userRoutes";
import { authRoutes } from "./adapter/routes/authRoutes";
import { AppDataSource } from "./infrastructure/repository/dataSource";
import logger from "./utils/logger";
import passport from "passport";
import "./infrastructure/googleStrategy";

dotenv.config();

async function startServer() {
  try {
    await AppDataSource.initialize();
    logger.info("Database connection established successfully.");

    const app = express();
    const port = process.env.PORT || 3000;
    const corsOrigins = process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : ["http://localhost:3000"];

    const corsOptions = {
      origin: corsOrigins,
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(passport.initialize());

    // Swagger definition (basic info for the API documentation)
    const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: "Events API",
        version: "1.0.0",
        description: "API documentation for Events Platform",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ bearerAuth: [] }],
    };

    // Options for `swagger-jsdoc` to dynamically generate OpenAPI spec
    const options = {
      swaggerDefinition,
      apis: ["./src/adapter/routes/*/*.ts"], // Points to your route files for JSDoc comments
    };

    const swaggerSpec = swaggerJSDoc(options);

    // Serve Swagger UI at /api-docs
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Mount event routes at the root or specific path

    app.use("/events", eventRoutes);
    app.use("/user", userRoutes);
    app.use("/auth", authRoutes);

    // Start the server
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
      logger.info("Swagger UI available at http://localhost:3000/api-docs");
    });
  } catch (error) {
    logger.error("Error connecting to the database", error);
    process.exit(1);
  }
}

startServer();
