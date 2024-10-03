//supabase/functions/doctors/routes/v1/user/userRouter.ts

import {Router} from "oak";
import {getSupabaseClient} from "../../../lib/supabase.ts";

const router = new Router();

router.post("/", async (ctx) => {

    const authHeader = ctx.request.headers.get("Authorization")!;
    const userSupabaseClient = getSupabaseClient(authHeader);
    const { data, error } = await userSupabaseClient.from("doctors")
        .select(
            "*",
        );

    if (error) {
        throw error;
    } else {
       return{ data }
    }
});

export default router;
