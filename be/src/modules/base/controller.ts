export class BaseController<S, D> {
  protected service: S;
  protected dto: D;

  constructor(service: S, dto: D) {
    this.service = service;
    this.dto = dto;
  }
}
