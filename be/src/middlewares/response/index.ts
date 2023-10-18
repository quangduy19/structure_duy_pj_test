import { Response } from "express";
import { HttpStatusCode } from "../../enum";

export class HTTPResponseMiddleware {
  static handleResponse = (
    res: Response,
    data: any,
    code: HttpStatusCode = HttpStatusCode.OK
  ) => {
    res.status(code).json({ status: "Ok", ...data });
  };
}
