import { Router } from "oak";

import userRouter from "./user/userRouter.ts";

const router = new Router();

router.use("/user", userRouter.routes());

export default router;
