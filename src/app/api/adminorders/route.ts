import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
// FETCH ALL ORDERS
export const GET = async (req: NextRequest) => {
    try {
      const orders = await prisma.order.findMany({
        where: {
          status: {
            not: "Completato",
          },
        },
        orderBy: {
          createdAt: 'asc', // Optional: Order by creation date
        },
      });
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
};
