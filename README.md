# 🤍 Casa Kind

Web application to support mental, emotional wellness and self-development.

## Tech Stack

- [Next.js](https://nextjs.org) App Router
- [React](https://react.dev) Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- [OpenAI](https://openai.com/) for AI provider
- [Supabase](https://supabase.com/) database for persistence of chat history and session storage 
- [Supabase Auth](https://supabase.com/docs/guides/auth/auth-helpers/nextjs) for authentication

## Getting Started

### Environment

Add the following to `.env.local`.

```
# PostgreSQL connection string used for migrations by Prisma Client
DIRECT_URL=""
# PostgreSQL connection string with pgBouncer config — used by Prisma Client
DATABASE_URL=""
OPENAI_API_KEY=""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
```

For deploying to Vercel, you will need to [add these environment variables](https://vercel.com/docs/projects/environment-variables) to your deployment settings.

### Supabase

#### Set up database trigger to insert auth.users into public.profile

Since we are using Supabase Auth for user authentication, the `auth.users` table stores the user account information. To copy this user data to our `public.profile` table, [add the following database trigger](https://supabase.com/docs/guides/auth/managing-user-data#advanced-techniques). You can run this SQL in the Supabase SQL Editor directly.

```SQL
-- inserts a row into public.profile
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profile (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```

#### Generate database types

1. Create a new file at `src/lib/database/types.ts`

2. Run the command
    ```
    npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > src/lib/database/types.ts --project-id <supabase_project_id>
    ```

### Prisma

#### Create a migration

1. Make a change to `prisma/schema.prisma`

2. Push change to [sync Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-migrate/mental-model) with database schema
    ```
    prisma migrate dev
    ```

3. [Generate updated Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client) with the following command:

    ```
    sudo prisma generate
    ```

4. Update local database types
    ```
    npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > src/lib/database/types.ts --project-id <supabase_project_id>
    ```

#### Seed database

1. Add seed data to `src/app/seed.ts`

2. Run seed command
    ```
    npx prisma db seed
    ```

## Development

### Run application locally 

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Troubleshooting

### Missing grants

If your database schema is out of sync from your migration history, prisma migrate dev will detect a migration history conflict or a schema drift. When prisma migrate dev detects the drift, it might ask to to reset your database schema. If you choose yes, it will delete the public schema along with the default grants defined in your database.

If you run into this problem, create a draft migration using prisma migrate dev --create-only, and [add the following helper SQL](https://supabase.com/partners/integrations/prisma):

```
grant usage on schema public to postgres, anon, authenticated, service_role;

grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all functions in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role;

alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;

```

### Unable to fetch Supabase data

If experiencing client permission denied for public schema, [run the following](https://stackoverflow.com/questions/67551593/supabase-client-permission-denied-for-schema-public) in the Supabase SQL Editor:

```
grant usage on schema "public" to anon;
grant usage on schema "public" to authenticated;

GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA "public" TO authenticated;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA "public" TO anon;
```