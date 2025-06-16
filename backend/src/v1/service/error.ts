export enum ErrorName {
  NotFoundError = "NotFoundError",
  BadRequestError = "BadRequestError",
  AuthorizationError = "UnauthorizedError",
  ForbiddenError = "ForbiddenError",
  ValidationError = "ValidationError",
  RequireError = "RequireError",
  ConflictError = "ConflictError",
}

class AppError extends Error {
  readonly statusCode: number;
  readonly name: ErrorName;
  constructor(message: string, name: ErrorName, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export default AppError;
