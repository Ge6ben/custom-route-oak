import { ZodError } from "zod";
import { Context, Middleware } from "oak";
import { PostgrestError } from "https://esm.sh/v135/@supabase/supabase-js@2.45.4/dist/module";

export const isPostgrestError = (error: unknown): error is PostgrestError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "details" in error &&
    "hint" in error &&
    "code" in error
  );
};

export const errorMiddleware: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  try {
    await next(); // Continue to the next middleware/route
  } catch (error) {
    console.error(error);

    // Handle/format validation errors
    if (error instanceof ZodError) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: {
          type: "validation_error",
          message: "Validation error",
          errors: error.format(),
        },
      };
      return;
    }

    // Handle/format PostgREST errors
    if (isPostgrestError(error)) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: {
          type: "database_error",
          message: error.message,
          errors: [error.details],
        },
      };
      return;
    }

    console.error("Error occurred:", error);

    // Set the response status code to indicate an error
    ctx.response.status = error.status || 500;
    ctx.response.body = {
      error: {
        type: error.type || !(error.status && error.type)
          ? "api_error"
          : "error",
        message: error.message ?? error.toString(),
        ...(error.code && { code: error.code }),
      },
    };
  }
};
