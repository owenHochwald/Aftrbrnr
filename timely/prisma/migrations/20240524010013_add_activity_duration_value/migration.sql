-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" SET DEFAULT concat('act_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "id" SET DEFAULT concat('cli_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "id" SET DEFAULT concat('prj_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "id" SET DEFAULT concat('tnt_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "inviteKey" SET DEFAULT replace(cast(gen_random_uuid() as text), '-', '');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));
