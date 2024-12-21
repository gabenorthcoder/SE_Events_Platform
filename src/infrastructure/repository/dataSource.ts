import { DataSource } from "typeorm";
import dotenv from "dotenv";
import "reflect-metadata";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: [`src/infrastructure/repository/entities/*.ts`],
  migrations: [`src/infrastructure/repository/migrations/*.ts`],
  subscribers: [],
});
