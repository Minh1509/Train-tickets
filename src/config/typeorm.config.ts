import { DataSource } from "typeorm";
import { config } from "@config/index";

const AppDataSource = new DataSource({
  type: "mysql",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: false,
  entities: ["**/*.entity.ts"],
  migrations: ["src/migrations/*-migration.ts"],
  migrationsRun: false,
  logging: true
});

export default AppDataSource;
