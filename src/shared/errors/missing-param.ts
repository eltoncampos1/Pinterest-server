export class MissimParamError extends Error {
  constructor(paramName: string) {
    super(`Missin param: ${paramName}`);
    this.name = 'MissingParamError';
  }
}
