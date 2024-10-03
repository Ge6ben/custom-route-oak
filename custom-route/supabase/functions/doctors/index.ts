//main.ts
import {oakCors} from "oakCors";
import {Application, Router} from "oak"; // Middleware
import {errorMiddleware} from "./lib/middlewares/error.ts";
import {corsMiddleware} from "./lib/middlewares/cors.ts";
import routes from "./routes/versionRoutes.ts"; //Global Variables

const app = new Application();
const router = new Router();

app.use(corsMiddleware);
app.use(errorMiddleware);

app.use(
    oakCors({
        origin: "*",
    }),
);

// Error handler middleware using the custom error class

app.use(routes.routes());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
