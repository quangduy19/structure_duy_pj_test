export class DtoBase<T> {
  protected repository: T;

  constructor(repository: T) {
    this.repository = repository;
  }
}
