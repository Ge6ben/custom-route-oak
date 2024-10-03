import { Context, Status } from "oak";

interface CustomError extends Error {
  code?: number; // Optional status code
}

export const globalErrorHandler = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  try {
    await next();
  } catch (error) {
    // For other types of errors
    handleError(ctx, error as CustomError);
  }
};

export const handleError = (
  ctx: Context,
  error: CustomError,
) => {
  console.error("Error occurred:", error);

  // Fallback to 500 Internal Server Error if no code is provided
  ctx.response.status = error.code ?? Status.InternalServerError;

  ctx.response.body = {
    message: error.message || "An unknown error occurred",
    success: false,
    data: null,
    error,
  };
};

export const sendOKResponse = (
  data: unknown,
  message: string,
  code: number,
  ctx: Context,
  meta?: Record<string, string | number | undefined>,
) => {
  ctx.response.status = code;
  ctx.response.body = {
    message: message,
    success: true,
    error: null,
    data: data,
    meta: meta,
  };
};
