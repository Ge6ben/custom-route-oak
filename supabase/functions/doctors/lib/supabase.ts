import {createClient, SupabaseClient} from "custom-route/supabase/functions/doctors/lib/supabase.ts";
import {Database as DatabaseTypes} from "./types/database.types.ts";

export type SupabaseClientType = SupabaseClient<DatabaseTypes, "public">;
// TODO: Replace with your own key! get it from running `supabase status`
const ANON_KEY = "";
export function getSupabaseClient(authHeader: string) {
    return createClient<SupabaseClientType>(
        "http://127.0.0.1:54321",
        ANON_KEY,
        {
            global: {
                headers: {
                    Authorization: authHeader,
                },
            },
        },
    );
}
