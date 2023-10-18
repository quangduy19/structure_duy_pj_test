import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Job } from "../entities/Job.entity";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Job)().createMany(25);
  }
}
