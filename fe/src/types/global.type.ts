import type { TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";
import { STATUS_API } from "../enums";

export interface Nav {
  title: string;
  link: string;
}
export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export interface ListResponse<T> {
  limit: number;
  page: number;
  status: STATUS_API;
  total: number;
  data: T[];
}

export interface DetailRepsonse<T> {
  status: STATUS_API;
  data: T | null;
}

export type ReadonlyProps<T> = {
  readonly [P in keyof T]: T[P];
};
