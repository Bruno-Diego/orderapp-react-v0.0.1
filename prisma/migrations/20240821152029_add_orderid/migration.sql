-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderId" TEXT NOT NULL DEFAULT gen_random_uuid();
