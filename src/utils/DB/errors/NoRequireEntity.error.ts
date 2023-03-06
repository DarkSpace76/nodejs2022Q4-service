export class NoRequiredEntity extends Error {
  constructor(operation: string) {
    super(`Fail during ${operation}.`);
    this.name = 'No required entity';
  }
}
