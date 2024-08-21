import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// CREATE ORDER
export const POST = async (req: NextRequest) => {
    try {
      const body = await req.json();
      console.log(body)
      const order = await prisma.order.create({
        data: body,
      });
      return new NextResponse(JSON.stringify(order), { status: 201 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
};