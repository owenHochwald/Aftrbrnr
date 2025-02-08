/*
  Warnings:

  - The `endAt` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `startAt` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "endAtArray" TIMESTAMP(3)[],
ADD COLUMN     "startAtArray" TIMESTAMP(3)[],
ALTER COLUMN "id" SET DEFAULT concat('act_', replace(cast(gen_random_uuid() as text), '-', '')),
DROP COLUMN "startAt",
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endAt",
ADD COLUMN     "endAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "id" SET DEFAULT concat('cli_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "id" SET DEFAULT concat('prj_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "id" SET DEFAULT concat('tnt_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "inviteKey" SET DEFAULT replace(cast(gen_random_uuid() as text), '-', '');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));
