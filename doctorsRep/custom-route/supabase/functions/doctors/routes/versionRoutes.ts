import { Router } from "oak";
import v1Router from "./v1/routes.ts";

const router = new Router();

router.use("/doctors", v1Router.routes());

export default router;
