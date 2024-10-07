import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_BRUNOTEST_SECRET_KEY);

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
  // App fee value
  // change also in checkout/
  const contribValue = 2

  const order = await prisma.order.findUnique({
    where: {
      orderId: orderId,
    },
  });

  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.price.toNumber() * 100,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      transfer_group: orderId, // Define transfer_group by orderId
      // application_fee_amount: contribValue * 100, 
    });

    await prisma.order.update({
      where: {
        orderId: orderId,
      },
      data: { intent_id: paymentIntent.id },
    });

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  }
  return new NextResponse(
    JSON.stringify({ message:"Order not found!" }),
    { status: 404 }
  );
}