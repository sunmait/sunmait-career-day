export default class ApplicationError extends Error {
  public message: string;
  public status: number;

  constructor(message, status) {
    super();

    if (!Error.captureStackTrace) {
      this.stack = (new Error()).stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;

    this.message = message || 'Something went wrong. Please try again.';

    this.status = status || 500;
  }
}
