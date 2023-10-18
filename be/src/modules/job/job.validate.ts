import { BaseError } from "../../middlewares/errors/BaseError";
import { Dto_JobCreate, Repository__Job } from "../../types";
import { Job } from "../../database/entities";
import { Request } from "express";
import { validate } from "class-validator";
import { HTTPErrorMiddleware } from "../../middlewares/errors";
import { JobRepository } from "../../database/repositories/Job.repository";
import { ErrorCode, HttpStatusCode } from "../../enum";
import { isNil } from "lodash";

export class JobValidator {
  static validJobCreate = async (req: Request): Promise<Dto_JobCreate> => {
    const job = new Job();
    job.title = req.body.title || "";
    job.expiry_date = new Date(req.body.expiry_date || undefined);
    job.description = req.body.description || "";
    const valid = await validate(job);
    if (valid.length > 0) {
      throw HTTPErrorMiddleware.formatValidationError(valid);
    }
    return job;
  };

  static validJobUpdate = async (
    req: Request,
    repository: JobRepository
  ): Promise<Repository__Job> => {
    const id = Number(req.params.id);
    const jobTmp = await repository.getDetail({ id: id });
    if (!jobTmp) {
      throw new BaseError({
        code: ErrorCode.NOT_FOUND,
        statusCode: HttpStatusCode.NOT_FOUND,
        message: `The Job doesn't exist.`,
      });
    }
    const job = new Job();
    job.id = id;
    job.title = isNil(req.body.title) ? jobTmp.title : req.body.title;
    job.expiry_date = isNil(req.body.expiry_date)
      ? jobTmp.expiry_date
      : new Date(req.body.expiry_date);
    job.description = isNil(req.body.description)
      ? jobTmp.description
      : req.body.description;
    job.created_at = jobTmp.created_at;

    const valid = await validate(job);
    if (valid.length > 0) {
      throw HTTPErrorMiddleware.formatValidationError(valid);
    }
    return job;
  };
}
