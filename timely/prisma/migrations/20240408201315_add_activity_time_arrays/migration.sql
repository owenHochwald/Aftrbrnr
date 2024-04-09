/*
  Warnings:

  - You are about to drop the column `times` on the `Activity` table. All the data in the column will be lost.
  - The `startAt` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endAt` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "times",
ALTER COLUMN "id" SET DEFAULT concat('act_', replace(cast(gen_random_uuid() as text), '-', '')),
DROP COLUMN "startAt",
ADD COLUMN     "startAt" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
DROP COLUMN "endAt",
ADD COLUMN     "endAt" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[];

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "id" SET DEFAULT concat('cli_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "id" SET DEFAULT concat('prj_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "id" SET DEFAULT concat('tnt_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "inviteKey" SET DEFAULT replace(cast(gen_random_uuid() as text), '-', '');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));
