import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

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

    console.log("Order PUT" + order);
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
    console.log("paymentIntent: " + paymentIntent);
    // Create a transfer only when the funds are available (using source_transaction)
    try {
      // Retrieve the charge to access the balance transaction fee
      const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);
      console.log("charge: " + charge);
      const balanceTransaction = await stripe.balanceTransactions.retrieve(
        charge.balance_transaction
      );
      console.log("balanceTransaction: " + balanceTransaction);

      // Calculate the transfer amount by deducting the balance transaction fee
      const totalAmount = order.price.toNumber() * 100; // Convert order price to cents
      const fee = balanceTransaction.fee; // Fee in cents
      const contribValue = totalAmount <= 4200 ? 200 : 500; // Contrib value in cents (2 or 5 euros based on total amount)

      const transferAmount = contribValue - fee; // Deduct fee and contrib value from total

      // Ensure transferAmount is not negative
      if (transferAmount <= 0) {
        throw new Error(
          "Transfer amount is zero or negative after deducting fees and contrib value."
        );
      }

      // Create the transfer
      const transfer = await stripe.transfers.create({
        amount: transferAmount, // Final transfer amount in cents
        currency: "eur",
        destination: process.env.STRIPE_KEBAP_CONNECTED_ACCOUNT, // Connected account ID
        source_transaction: paymentIntent.latest_charge, // Associate the charge with the transfer
        transfer_group: orderId, // Use the transfer_group from PaymentIntent
      });

      console.log("Transfer created: ", transfer);

      return new NextResponse(
        JSON.stringify({ message: "Order updated and transfer created." }),
        { status: 200 }
      );
    } catch (transferError) {
      // Handle transfer errors
      console.error("Error creating transfer: ", transferError);
      return new NextResponse(
        JSON.stringify({
          message: "Transfer failed. Please check the connected account.",
        }),
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
