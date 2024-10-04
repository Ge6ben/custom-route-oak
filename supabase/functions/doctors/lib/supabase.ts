import {createClient, SupabaseClient} from "supabase";
import {Database as DatabaseTypes} from "./types/database.types.ts";

export type SupabaseClientType = SupabaseClient<DatabaseTypes, "public">;

export function getSupabaseClient(authHeader: string) {
    return createClient<SupabaseClientType>(
        Deno.env.get("SUPABASE_URL"),
        Deno.env.get("SUPABASE_ANON_KEY"),
        {
            global: {
                headers: {
                    Authorization: authHeader,
                },
            },
        },
    );
}
