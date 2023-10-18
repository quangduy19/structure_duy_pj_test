import { IsNull, Repository } from "typeorm";
import { Job } from "../entities/Job.entity";
import { dataSource } from "../";
import {
  Dto_JobCreate,
  Dto_JobDetail,
  Dto_JobList,
  Reponse__JobDetail,
  Repository_ListJob,
  Repository__Job,
} from "../../types";
import { omit } from "lodash";

export class JobRepository {
  private repository: Repository<Job>;

  constructor() {
    this.repository = dataSource.getRepository(Job);
  }

  public getList = async (
    payload: Dto_JobList
  ): Promise<Repository_ListJob> => {
    const limit = Number(payload.limit);
    const offset = (Number(payload.page) - 1) * limit;

    const [results, total] = await this.repository.findAndCount({
      take: limit,
      skip: offset,
      where: { deleted_at: IsNull() },
      order: {
        id: "DESC",
      },
      select: {
        id: true,
        title: true,
        expiry_date: true,
        description: true,
        created_at: true,
      },
    });
    return {
      results,
      total,
    };
  };

  public getDetail = async (
    payload: Dto_JobDetail
  ): Promise<Repository__Job | null> => {
    return await this.repository.findOne({
      where: { id: payload.id },
      select: {
        id: true,
        title: true,
        expiry_date: true,
        description: true,
        created_at: true,
      },
    });
  };

  public delete = async (payload: Dto_JobDetail): Promise<Dto_JobDetail> => {
    await this.repository.softDelete(payload.id);
    return payload;
  };

  public create = async (payload: Dto_JobCreate): Promise<Repository__Job> => {
    const job = new Job();
    job.title = payload.title;
    job.expiry_date = payload.expiry_date;
    job.description = payload.description || "";
    job.created_at = new Date();

    const data = await this.repository.save(job);
    return omit(data, ["updated_at", "deleted_at", "version"]);
  };

  public update = async (payload: Repository__Job) => {
    const data = await this.repository.update(
      payload.id,
      omit(payload, ["id"])
    );
    return payload;
  };
}
