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

## Prisma

### Create a migration

1. Make a change to `prisma/schema.prisma`

2. Push change to [sync Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-migrate/mental-model) with database schema

    ```
    prisma migrate dev
    ```

3. [Generate updated Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client) with the following command:

    ```
    sudo prisma generate
    ```

## Supabase

### Set up database trigger for users

Since we are using Supabase Auth for user authentication, the `auth.users` table stores the user account information. To copy this user data to our `public.users` table, [add the following database trigger](https://github.com/orgs/supabase/discussions/306):

```SQL
create function handle_new_user()
returns trigger
language plpgsql
as $$
begin
  insert into public.users(id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function handle_new_user();
```