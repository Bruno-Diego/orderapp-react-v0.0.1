-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "fk_user_email";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
