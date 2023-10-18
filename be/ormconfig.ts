import config from "./src/config";
import { Job } from "./src/database/entities";

export default {
  type: config.DATABASE,
  host: config.DATABASE_HOST,
  port: Number(config.DATABASE_PORT),
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  entities: [Job],
  migrations: [],
  seeds: [config.TYPEORM_SEEDING_SEEDS],
  factories: [config.TYPEORM_SEEDING_FACTORIES],
  logging: true,
  // logger: new CustomeLoggerTypeORM(),
  synchronize: true,
};
