import { BaseService } from "../base/service";
import { JobRepository } from "../../database/repositories/Job.repository";
import {
  Dto_JobCreate,
  Dto_JobDetail,
  Dto_JobList,
  Reponse__JobDelete,
  Reponse__JobDetail,
  Reponse__JobList,
  Repository_ListJob,
  Repository__Job,
} from "../../types";

export class JobService extends BaseService<JobRepository> {
  constructor(repository: JobRepository) {
    super(repository);
  }

  public getList = async (payload: Dto_JobList): Promise<Reponse__JobList> => {
    const data: Repository_ListJob = await this.repository.getList(payload);
    return {
      ...payload,
      total: data.total,
      data: data.results,
    };
  };

  public getDetail = async (
    payload: Dto_JobDetail
  ): Promise<Reponse__JobDetail> => {
    const data = await this.repository.getDetail(payload);
    return { data: data };
  };

  public delete = async (
    payload: Dto_JobDetail
  ): Promise<Reponse__JobDelete> => {
    const data = await this.repository.delete(payload);
    return { data: data };
  };

  public create = async (
    payload: Dto_JobCreate
  ): Promise<Reponse__JobDetail> => {
    const data = await this.repository.create(payload);
    return { data: data };
  };

  public update = async (
    payload: Repository__Job
  ): Promise<Reponse__JobDetail> => {
    const data = await this.repository.update(payload);
    return { data: data };
  };
}
