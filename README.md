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
