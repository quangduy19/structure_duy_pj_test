import {
  Dto_JobCreate,
  Dto_JobDetail,
  Dto_JobList,
  Repository__Job,
} from "../../types";
import { Request } from "express";
import { JobValidator } from "./job.validate";
import { JobRepository } from "../../database/repositories/Job.repository";
import { DtoBase } from "../base/dto";

export class JobDto extends DtoBase<JobRepository> {
  constructor(repository: JobRepository) {
    super(repository);
  }

  async getJobListDto(req: Request): Promise<Dto_JobList> {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    return {
      page: page || 1,
      limit: limit || 10,
    };
  }

  async getJobCreateDto(req: Request): Promise<Dto_JobCreate> {
    const payload = await JobValidator.validJobCreate(req);
    return payload;
  }

  async getJobDetailDto(req: Request): Promise<Dto_JobDetail> {
    return {
      id: Number(req.params.id),
    };
  }

  async getJobDetailUpdateDto(req: Request): Promise<Repository__Job> {
    const payload = await JobValidator.validJobUpdate(req, this.repository);
    return payload;
  }
}
