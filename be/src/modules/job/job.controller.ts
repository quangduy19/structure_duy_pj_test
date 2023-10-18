import { ErrorCode } from "../../enum";
import { BaseError } from "../../middlewares/errors/BaseError";
import { HTTPResponseMiddleware } from "../../middlewares/response";
import {
  Dto_JobDetail,
  Reponse__JobDelete,
  Reponse__JobDetail,
  Reponse__JobList,
} from "../../types";
import { BaseController } from "../base/controller";
import { JobDto } from "./job.dto";
import { JobService } from "./job.service";
import { Request, Response } from "express";

export class JobController extends BaseController<JobService, JobDto> {
  constructor(service: JobService, dto: JobDto) {
    super(service, dto);
  }

  public getList = async (req: Request, res: Response) => {
    const payload = await this.dto.getJobListDto(req);
    const data: Reponse__JobList = await this.service.getList(payload);

    HTTPResponseMiddleware.handleResponse(res, data);
  };

  public create = async (req: Request, res: Response) => {
    const payload = await this.dto.getJobCreateDto(req);
    const data = await this.service.create(payload);
    HTTPResponseMiddleware.handleResponse(res, data);
  };

  public getDetail = async (req: Request, res: Response) => {
    const payload: Dto_JobDetail = await this.dto.getJobDetailDto(req);
    const data: Reponse__JobDetail = await this.service.getDetail(payload);

    HTTPResponseMiddleware.handleResponse(res, data);
  };

  public update = async (req: Request, res: Response) => {
    const payload = await this.dto.getJobDetailUpdateDto(req);
    const data: Reponse__JobDetail = await this.service.update(payload);
    HTTPResponseMiddleware.handleResponse(res, data);
  };

  public delete = async (req: Request, res: Response) => {
    const payload: Dto_JobDetail = await this.dto.getJobDetailDto(req);
    const data: Reponse__JobDelete = await this.service.delete(payload);

    HTTPResponseMiddleware.handleResponse(res, data);
  };
}
