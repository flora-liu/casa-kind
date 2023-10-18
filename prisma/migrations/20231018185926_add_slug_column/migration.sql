/*
  Warnings:

  - You are about to drop the `_category_to_prompt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `entry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prompt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_category_to_prompt" DROP CONSTRAINT "_category_to_prompt_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_category_to_prompt" DROP CONSTRAINT "_category_to_prompt_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."entry" DROP CONSTRAINT "entry_promptId_fkey";

-- DropForeignKey
ALTER TABLE "public"."entry" DROP CONSTRAINT "entry_userId_fkey";

-- DropTable
DROP TABLE "public"."_category_to_prompt";

-- DropTable
DROP TABLE "public"."category";

-- DropTable
DROP TABLE "public"."entry";

-- DropTable
DROP TABLE "public"."profile";

-- DropTable
DROP TABLE "public"."prompt";

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,

    CONSTRAINT "prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entry" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" DATE NOT NULL,
    "userId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "promptId" UUID NOT NULL,

    CONSTRAINT "entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_category_to_prompt" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "category_title_key" ON "category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_category_to_prompt_AB_unique" ON "_category_to_prompt"("A", "B");

-- CreateIndex
CREATE INDEX "_category_to_prompt_B_index" ON "_category_to_prompt"("B");

-- AddForeignKey
ALTER TABLE "entry" ADD CONSTRAINT "entry_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry" ADD CONSTRAINT "entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_category_to_prompt" ADD CONSTRAINT "_category_to_prompt_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_category_to_prompt" ADD CONSTRAINT "_category_to_prompt_B_fkey" FOREIGN KEY ("B") REFERENCES "prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
