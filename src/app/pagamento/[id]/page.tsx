"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { useCartStore } from "@/lib/store";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState, useRef } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_BRUNOTEST_PUBLISHABLE_KEY!
);

const PayPage = ({ params }: { params: { id: string } }) => {
  const [clientSecret, setClientSecret] = useState("");
  const { products, totalPrice, resetCart } = useCartStore();

  const { id } = params;

 // useRef to track if the useEffect has run
 const hasFetchedData = useRef(false); 

 useEffect(() => {
   // Prevents double fetching in development (due to React.StrictMode)
   if (hasFetchedData.current) {
     return;
   }

   const makeRequest = async () => {
     try {
       const res = await fetch(`/api/create-intent/${id}`, {
         method: "POST",
       });
       const data = await res.json();
       setClientSecret(data.clientSecret);
     } catch (err) {
       console.log(err);
     }
   };

   makeRequest();

   // Mark that the request has been made
   hasFetchedData.current = true;

 }, [id]); // Only re-run when `id` changes

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div>
      {totalPrice === 0 ? (
        <div className="text-center text-2xl font-bold mb-6 text-white">
          <p>Il tuo carrello è vuoto.</p>
          <p>Aggiungi prodotti al tuo ordine.</p>
        </div>
      ) : (
        <div>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm orderId={id} clientSecret={clientSecret} />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};

export default PayPage;
