-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "fk_user_id";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkUserId") ON DELETE NO ACTION ON UPDATE CASCADE;
