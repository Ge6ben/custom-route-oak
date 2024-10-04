create sequence "public"."doctors_id_seq";

create table "public"."doctors" (
    "id" integer not null default nextval('doctors_id_seq'::regclass),
    "user_id" uuid,
    "specialization" text,
    "license_number" text
);


create table "public"."user_meta" (
    "id" uuid not null default gen_random_uuid(),
    "email" text not null,
    "password" text not null,
    "role" text,
    "name" text,
    "created_at" timestamp without time zone default now()
);


alter sequence "public"."doctors_id_seq" owned by "public"."doctors"."id";

CREATE UNIQUE INDEX doctors_pkey ON public.doctors USING btree (id);

CREATE UNIQUE INDEX user_meta_email_key ON public.user_meta USING btree (email);

CREATE UNIQUE INDEX user_meta_pkey ON public.user_meta USING btree (id);

alter table "public"."doctors" add constraint "doctors_pkey" PRIMARY KEY using index "doctors_pkey";

alter table "public"."user_meta" add constraint "user_meta_pkey" PRIMARY KEY using index "user_meta_pkey";

alter table "public"."user_meta" add constraint "user_meta_email_key" UNIQUE using index "user_meta_email_key";

alter table "public"."user_meta" add constraint "user_meta_role_check" CHECK ((role = ANY (ARRAY['Doctor'::text, 'Patient'::text]))) not valid;

alter table "public"."user_meta" validate constraint "user_meta_role_check";

grant delete on table "public"."doctors" to "anon";

grant insert on table "public"."doctors" to "anon";

grant references on table "public"."doctors" to "anon";

grant select on table "public"."doctors" to "anon";

grant trigger on table "public"."doctors" to "anon";

grant truncate on table "public"."doctors" to "anon";

grant update on table "public"."doctors" to "anon";

grant delete on table "public"."doctors" to "authenticated";

grant insert on table "public"."doctors" to "authenticated";

grant references on table "public"."doctors" to "authenticated";

grant select on table "public"."doctors" to "authenticated";

grant trigger on table "public"."doctors" to "authenticated";

grant truncate on table "public"."doctors" to "authenticated";

grant update on table "public"."doctors" to "authenticated";

grant delete on table "public"."doctors" to "service_role";

grant insert on table "public"."doctors" to "service_role";

grant references on table "public"."doctors" to "service_role";

grant select on table "public"."doctors" to "service_role";

grant trigger on table "public"."doctors" to "service_role";

grant truncate on table "public"."doctors" to "service_role";

grant update on table "public"."doctors" to "service_role";

grant delete on table "public"."user_meta" to "anon";

grant insert on table "public"."user_meta" to "anon";

grant references on table "public"."user_meta" to "anon";

grant select on table "public"."user_meta" to "anon";

grant trigger on table "public"."user_meta" to "anon";

grant truncate on table "public"."user_meta" to "anon";

grant update on table "public"."user_meta" to "anon";

grant delete on table "public"."user_meta" to "authenticated";

grant insert on table "public"."user_meta" to "authenticated";

grant references on table "public"."user_meta" to "authenticated";

grant select on table "public"."user_meta" to "authenticated";

grant trigger on table "public"."user_meta" to "authenticated";

grant truncate on table "public"."user_meta" to "authenticated";

grant update on table "public"."user_meta" to "authenticated";

grant delete on table "public"."user_meta" to "service_role";

grant insert on table "public"."user_meta" to "service_role";

grant references on table "public"."user_meta" to "service_role";

grant select on table "public"."user_meta" to "service_role";

grant trigger on table "public"."user_meta" to "service_role";

grant truncate on table "public"."user_meta" to "service_role";

grant update on table "public"."user_meta" to "service_role";


