import { Context, Middleware } from "oak";

export const corsMiddleware: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  // Set CORS headers
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "authorization, x-client-info, apikey, content-type",
  );

  await next();
};
