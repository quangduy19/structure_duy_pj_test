import { NextFunction, Request, Response } from "express";
import { BaseError } from "./BaseError";
import { ErrorCode, ErrorMessage, HttpStatusCode } from "../../enum";
import { ValidationError } from "class-validator";

export class HTTPErrorMiddleware {
  static handleError = (
    err: BaseError | any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    sendErrorToClient(res, err);
  };

  static handleErrorNotFound = (
    err: BaseError | any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    sendErrorToClient(
      res,
      new BaseError({
        statusCode: HttpStatusCode.NOT_FOUND,
        code: ErrorCode.NOT_FOUND,
        message: "Api Not Found",
        detail: [],
      })
    );
  };

  static formatValidationError = (errors: ValidationError[]): BaseError => {
    return new BaseError({
      code: ErrorCode.VALIDATION_ERROR,
      message:
        errors?.length === 1
          ? Object.values(errors?.[0]?.constraints as Object)?.[0]
          : ErrorMessage.VALIDATION_ERROR,
      statusCode: HttpStatusCode.BAD_REQUEST,
      detail:
        errors?.length > 1
          ? errors.map((err: ValidationError) => ({
              field: err.property,
              message: Object.values(err.constraints as Object)?.[0] || "",
            }))
          : [],
    });
  };
}

export function sendErrorToClient(res: Response, err: BaseError) {
  let code: ErrorCode;
  if (!err.code) code = ErrorCode.INTERNAL_ERROR;
  else if (!Object.values(ErrorCode).includes(err.code))
    code = ErrorCode.BAD_REQUEST;
  else code = err.code;

  return res
    .status(Number(err.statusCode || HttpStatusCode.INTERNAL_SERVER))
    .json({
      status: "error",
      data: {
        code: code,
        message: err?.message || "Something went wrong!",
        detail: err?.detail || [],
      },
    });
}
