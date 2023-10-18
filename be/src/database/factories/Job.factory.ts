import { define } from "typeorm-seeding";
import { faker as fk } from "@faker-js/faker";
import { Job } from "../entities/Job.entity";

define(Job, () => {
  const job = new Job();
  job.title = fk.person.jobTitle();
  job.description = fk.person.jobDescriptor();
  job.expiry_date = fk.date.future({ years: 10 });
  job.created_at = new Date();
  job.updated_at = new Date();
  return job;
});
