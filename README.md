### Custom Roue in Supabase

1. First make sure docker is running
2. Add your local anon key in this path:

``` 
supabase/functions/doctors/lib/supabase.ts
```

3. Run this command

````
supabase functions serve --debug

````
4. Past postman request and add your anon key:

```


curl --location 'http://127.0.0.1:54321/functions/v1/doctors/user' \
--header 'Authorization: Bearer YOUR_ANON_KEY' \
--header 'Content-Type: application/json' \
--header 'apikey:   YOUR_ANON_KEY' \
--data '{
"la":"s"
}' 

```


 
 
### To Setup Deno

Follow this setup guide to integrate the Deno language server with your editor:
https://deno.land/manual/getting_started/setup_your_environment
This enables autocomplete, go to definition, etc.

### Generating updated types in database.types.ts

- Run `npm i` to install supabase

- Run supabase login `npx supabase login` (Note: you must already have access to
  the database; You'll be asked to provide your developer access token)

- Run supabase init `npx supabase init` (Ignore if already initialized)

- Run supabase link `npx supabase link --project-ref {xyz}` (Replace with the
  {xyz} portion of the Supabase URL https://{xyz}.supabase.co)

- Run the npm script `npm run generate-supabase-types` from inside the
  supabase directory

- After you completed these steps, you'll only have to do the last one to renew
  the types when they change

### Generating a new seed and local database

- You must first login to supabase and go through the supabase setup. The first
  4 steps of "Generating updated types in database.types.ts" will help here.
- Run `npm run generate-local-seed` (Note: you may need the database password;
  ask for it)
- Run `npm run start-local-database` (Note: make sure you have Docker installed
  on your machine first)

### Contributing to the edge function

#### Running it

1. Copy .env.example to .env
2. Set the variables accordingly
3. Run `supabase functions serve --env-file [/absolute/path/to/.env]
 

### Run denon

1. `cd supabase/functions/doctors`
2. `denon start`

-----

### Generate types for your project to produce the database.types.ts file :

TODO: Create command to generate types for the project

- Production

``` 
npx supabase gen types --lang=typescript --project-id "$PROJECT_REF" --schema public > database.types.ts
```

- Local

``` 
npx supabase gen types --lang=typescript --local > database.types.ts
```

- Reset supabase db

``` 
npx supabase db reset
```

- Create a migration

``` 
supabase migration new schema_test

```

- Bring production to local

``` 
 supabase db diff --use-migra initial_shema -f initial_schema

```

[More info](https://supabase.com/docs/guides/api/rest/generating-types)

### Resources

- [Managing Environment Variables](https://supabase.com/docs/guides/functions/secrets#production-secrets)
- [Getting the information of a user on the server side from Authentication token](https://supabase.com/docs/guides/functions/auth)
