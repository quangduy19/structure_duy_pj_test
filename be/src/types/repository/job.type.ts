import { Job } from "../../database/entities";

export type Repository__Job = Omit<
  Job,
  "updated_at" | "deleted_at" | "version"
>;

export interface Repository_ListJob {
  results: Repository__Job[];
  total: number;
}
