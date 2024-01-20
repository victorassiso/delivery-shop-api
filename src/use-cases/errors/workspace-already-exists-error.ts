export class WorkspaceAlreadyExistsError extends Error {
  constructor() {
    super('Workspace code already exists')
  }
}
