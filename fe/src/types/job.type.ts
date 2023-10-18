import { DetailRepsonse, ListResponse } from "./global.type";

export interface Job {
  id: number;
  title: string;
  description?: string;
  expiryDate: string;
  createdAt: string;
}

export interface Job__ListRequest {
  page: number;
  limit: number;
}

export type Job__CreateRequest = Omit<Job, "id" | "createdAt">;
export type Job__DetailRequest = Pick<Job, "id">;
export type Job__UpdateRequest = Omit<Job, "createdAt">;

export type Job__ListResponse = ListResponse<Job>;
export type Job__DetailResponse = DetailRepsonse<Job>;
