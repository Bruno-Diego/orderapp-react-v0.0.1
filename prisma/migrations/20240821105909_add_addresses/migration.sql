-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userAddress" TEXT,
ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "fk_user_email" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE NO ACTION ON UPDATE NO ACTION;
