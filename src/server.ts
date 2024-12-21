import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import eventRoutes from "./adapter/routes/eventRoute";
import { userRoutes } from "./adapter/routes/userRoutes";
import { protectedRoutes } from "./adapter/routes/protectedRoutes";
import { AppDataSource } from "./infrastructure/repository/dataSource";
import logger from "./utils/logger";

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

    // Swagger definition (basic info for the API documentation)
    const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: "Events Platform API",
        description: "API documentation for the Events Platform",
        version: "1.0.0",
      },
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
    app.use("/", eventRoutes);
    app.use("/user", userRoutes);
    app.use("/auth", protectedRoutes);

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
