export enum ErrorName {
  NotFoundError = "NotFoundError",
  BadRequestError = "BadRequestError",
  AuthorizationError = "UnauthorizedError",
  ForbiddenError = "ForbiddenError",
  ValidationError = "ValidationError",
  RequireError = "RequireError",
  ConflictError = "ConflictError",
}

const StatusCodeMap: Record<ErrorName, number> = {
  [ErrorName.NotFoundError]: 404,
  [ErrorName.BadRequestError]: 400,
  [ErrorName.AuthorizationError]: 401,
  [ErrorName.ForbiddenError]: 403,
  [ErrorName.ValidationError]: 422,
  [ErrorName.RequireError]: 400,
  [ErrorName.ConflictError]: 409,
};

class AppError extends Error {
  readonly statusCode: number;
  readonly name: ErrorName;
  constructor(message: string, name: ErrorName) {
    super(message);
    this.name = name;
    this.statusCode = StatusCodeMap[name];
  }
}

export default AppError;
