export interface List {
  page: number;
  limit: number;
  total: number;
}

export interface DetailResponse<T> {
  data: T;
}

export type EntityCUDDate = "created_at" | "updated_at" | "deleted_at";

export type ListResponse<T> = List & { data: T[] };
