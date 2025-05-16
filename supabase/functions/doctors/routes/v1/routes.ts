import { Router } from "oak";

import userRouter from "./user/userRouter.ts";
import videoRouter from "./video/videoRouter.ts";

const router = new Router();

router.use("/user", userRouter.routes());
router.use("/video", videoRouter.routes());

export default router;
