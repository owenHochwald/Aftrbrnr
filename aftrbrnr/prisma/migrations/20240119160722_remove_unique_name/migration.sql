-- DropIndex
DROP INDEX "Tenant_name_key";

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "name" DROP NOT NULL;
