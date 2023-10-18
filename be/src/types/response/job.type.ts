import { Job } from "../../database/entities";
import { DetailResponse, EntityCUDDate, ListResponse } from "../common.type";
import { Repository__Job } from "../repository";

export type Reponse__JobList = ListResponse<Repository__Job>;

export type Reponse__JobDetail = DetailResponse<Repository__Job | null>;

export type Reponse__JobDelete = DetailResponse<Pick<
  Repository__Job,
  "id"
> | null>;
