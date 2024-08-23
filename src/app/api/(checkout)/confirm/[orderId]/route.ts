import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const PUT = async (request: NextRequest) => {
  const url = new URL(request.url);
  const orderId = url.pathname.split("/").pop(); // Extract orderId from the URL path

  if (!orderId) {
    return new NextResponse(
      JSON.stringify({ message: "Order ID is missing in the request" }),
      { status: 400 }
    );
  }

  console.log("orderId: " + orderId);

  try {
    await prisma.order.update({
      where: {
        orderId: orderId,
      },
      data: { status: "In Cucina!" },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
