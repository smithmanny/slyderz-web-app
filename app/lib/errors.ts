import { isObject } from "./utils";

class UnknownCauseError extends Error {
  [key: string]: unknown;
}

function getCauseFromUnknown(cause: unknown): Error | undefined {
  if (cause instanceof Error) {
    return cause;
  }

  const type = typeof cause;
  if (type === 'undefined' || type === 'function' || cause === null) {
    return undefined;
  }

  // Primitive types just get wrapped in an error
  if (type !== 'object') {
    return new Error(String(cause));
  }

  // If it's an object, we'll create a synthetic error
  if (isObject(cause)) {
    const err = new UnknownCauseError();
    for (const key in cause) {
      err[key] = cause[key];
    }
    return err;
  }

  return undefined;
}

export class NotFoundError extends Error {
  public readonly cause?: Error;
  public readonly code;

  constructor(opts: {
    message?: string;
    cause?: unknown;
  }) {
    const cause = getCauseFromUnknown(opts.cause);
    const message = opts.message ?? cause?.message ?? "Entity not found!";

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore https://github.com/tc39/proposal-error-cause
    super(message, { cause });

    this.name = 'NotFoundError';

    if (!this.cause) {
      // idk why this is needed, but it is
      this.cause = cause;
    }
  }
}

export class UnknownError extends Error {
  public readonly cause?: Error;
  public readonly code;

  constructor(opts: {
    message?: string;
    cause?: unknown;
  }) {
    const cause = getCauseFromUnknown(opts.cause);
    const message = opts.message ?? cause?.message ?? "Unknown error!";

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore https://github.com/tc39/proposal-error-cause
    super(message, { cause });

    this.name = 'NotFoundError';

    if (!this.cause) {
      // idk why this is needed, but it is
      this.cause = cause;
    }
  }
}

export class TokenError extends Error {
  public readonly cause?: Error;
  public readonly code;

  constructor(opts: {
    message?: string;
    cause?: unknown;
  }) {
    const cause = getCauseFromUnknown(opts.cause);
    const message = opts.message ?? cause?.message ?? "Token error!";

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore https://github.com/tc39/proposal-error-cause
    super(message, { cause });

    this.name = 'TokenError';

    if (!this.cause) {
      // idk why this is needed, but it is
      this.cause = cause;
    }
  }
}

export class AuthError extends Error {
  public readonly code;

  constructor(opts?: string) {
    const message = opts ?? "You must be signed in.";

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore https://github.com/tc39/proposal-error-cause
    super(message);

    this.name = 'AuthError';
  }
}
