"use client";

import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import { ClipLoader } from "react-spinners";

import { useCartStore } from "@/lib/store";
import { GiPadlock } from "react-icons/gi";

const CheckoutForm = ({
  orderId,
  clientSecret,
}: {
  orderId: string;
  clientSecret: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { products, totalPrice, resetCart } = useCartStore();

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }

    const checkPaymentStatus = () => {
      stripe
        .retrievePaymentIntent(clientSecret)
        .then(({ paymentIntent }) => {
          console.log("Payment Intent Status: " + paymentIntent?.status); // Log the status

          switch (paymentIntent?.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              // Continue checking if it's still processing
              setTimeout(checkPaymentStatus, 50); // Check again after 5 seconds
              break;
            case "requires_payment_method":
              setMessage("Please provide a payment method.");
              setTimeout(checkPaymentStatus, 50)
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }
        })
        .catch((error) => {
          console.error("Error retrieving Payment Intent:", error);
          setMessage("Error occurred while checking payment status.");
        });
    };

    // Initial check
    checkPaymentStatus();
  }, [stripe, clientSecret]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    // console.log(isLoading)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_STRIPE_BASE_URL}/order-confirmation/${orderId}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      console.log(error);
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "Something went wrong!");
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsLoading(false);
    } else {
      // Reset the cart only if the payment was successful
      setIsLoading(false);
    }
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="text-white min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] p-4 lg:px-20 xl:px-40 flex flex-col gap-8"
    >
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <AddressForm />
      <button
        disabled={isLoading}
        id="submit"
        className="bg-red-500 text-white p-4 rounded-md w-1/2 mx-auto"
      >
        <span id="button-text" className="flex justify-center">
          {isLoading ? (
            <ClipLoader size={24} color="#ffffff" /> // Show spinner while submitting
          ) : (
            <div className="flex text-center items-center gap-1">
              <GiPadlock />
              Pagamento Sicuro
            </div>
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div
          className="bg-gray-500 text-white p-4 rounded-md w-1/2 mx-auto text-center"
          id="payment-message"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
