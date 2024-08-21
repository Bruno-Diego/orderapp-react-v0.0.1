import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// FETCH USER ORDERS
export const GET = async (req: NextRequest) => {
    const emailAddress = req.nextUrl.pathname.split('/').pop();

    try {
      const orders = await prisma.order.findMany({
        where: {
            userEmail: emailAddress,
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
