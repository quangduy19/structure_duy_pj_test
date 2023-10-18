export interface Dto_JobList {
  page: number;
  limit: number;
}

export interface Dto_JobDetail {
  id: number;
}

export interface Dto_JobCreate {
  title: string;
  expiry_date: Date;
  description?: string;
}
