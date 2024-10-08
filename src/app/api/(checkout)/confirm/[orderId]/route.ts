import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_BRUNOTEST_SECRET_KEY);

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
    // Atualize o status do pedido para "In Cucina!"
    const order = await prisma.order.update({
      where: {
        orderId: orderId,
      },
      data: { status: "In Cucina!" },
    });

    console.log("Order PUT" + order)
    // Verifique se o pedido e o intent_id existem
    if (!order || !order.intent_id) {
      return new NextResponse(
        JSON.stringify({ message: "Order or Payment Intent not found!" }),
        { status: 404 }
      );
    }

    // Assuming paymentIntent is stored in the order
    const paymentIntentId = order.intent_id;

    if (!paymentIntentId) {
      return new NextResponse(
        JSON.stringify({ message: "Payment Intent not found!" }),
        { status: 404 }
      );
    }

    // Retrieve the Payment Intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log("paymentIntent: " + paymentIntent)
    // Create a transfer only when the funds are available (using source_transaction)
    try {
      // Realize a transferência dos fundos para a conta conectada
      const transferAmount = (order.price.toNumber() - 2) * 100; // O valor do produto menos o contribValue (2 euros)

      const transfer = await stripe.transfers.create({
        amount: transferAmount, // Valor em centavos
        currency: "eur",
        destination: process.env.STRIPE_KEBAP_CONNECTED_ACCOUNT, // ID da conta conectada do restaurante
        source_transaction: paymentIntent.latest_charge, // Associate the charge with the transfer
        transfer_group: orderId, // Use o transfer_group do PaymentIntent
      });

      console.log("Transfer created: ", transfer);

      return new NextResponse(
        JSON.stringify({ message: "Order updated and transfer created." }),
        { status: 200 }
      );
    } catch (transferError) {
      // Se houver falha na transferência, registre o erro e retorne a mensagem apropriada
      console.error("Error creating transfer: ", transferError);
      return new NextResponse(
        JSON.stringify({ message: "Transfer failed. Please check the connected account." }),
        { status: 500 }
      );
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

