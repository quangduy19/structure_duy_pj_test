export class BaseService<T> {
  protected repository: T;

  constructor(repository: T) {
    this.repository = repository;
  }
}
