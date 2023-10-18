import { ApiPath } from "../constant";
import {
  Job__CreateRequest,
  Job__DetailRequest,
  Job__ListRequest,
  Job__UpdateRequest,
} from "../types";
import API from "./api";
import { omit } from "lodash";
import { cameltoSnake, replacePathApi } from "../utils";

const getListJob = (params: Job__ListRequest) => {
  return API.get(ApiPath.job.list, { params }).then((res) => res.data);
};

const createJob = (params: Job__CreateRequest) => {
  const _params = cameltoSnake(params);
  return API.post(ApiPath.job.create, _params).then((res) => res.data);
};

const getJobDetail = (params: Job__DetailRequest) => {
  const path = replacePathApi(ApiPath.job.detail, { id: params.id });
  return API.get(path).then((res) => res.data);
};

const updateJob = (params: Job__UpdateRequest) => {
  const _params = cameltoSnake(omit(params, ["id"]));
  const path = replacePathApi(ApiPath.job.detail, { id: params.id });
  return API.put(path, _params).then((res) => res.data);
};

const deleteJob = (params: Job__DetailRequest) => {
  const path = replacePathApi(ApiPath.job.detail, { id: params.id });
  return API.delete(path).then((res) => res.data);
};

export default {
  getListJob,
  createJob,
  getJobDetail,
  updateJob,
  deleteJob,
};
