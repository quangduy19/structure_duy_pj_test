import { ErrorCode, HttpStatusCode } from "../../enum";

export class BaseError extends Error {
  code: ErrorCode;
  statusCode: HttpStatusCode;
  message: string;
  detail: any[];

  constructor(error: {
    code: ErrorCode;
    statusCode?: HttpStatusCode;
    message: string;
    detail?: any[];
  }) {
    super(error.message);
    this.code = error.code;
    this.statusCode = error.statusCode || HttpStatusCode.BAD_REQUEST;
    this.message = error.message;
    this.detail = error.detail || [];
  }
}
