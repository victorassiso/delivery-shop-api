export class BusinessAlreadyExistsError extends Error {
  constructor() {
    super('Business code already in use')
  }
}
