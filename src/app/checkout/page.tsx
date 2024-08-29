"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { useCartStore } from "@/lib/store"; // Adjust import path as needed
import { Button } from "@/components/ui/button"; // Adjust import path as needed
import { useAuth, SignInButton, useUser } from "@clerk/nextjs";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { ClipLoader } from "react-spinners";

const CheckoutPage: React.FC = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { products, totalPrice, resetCart } = useCartStore();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  const methods = useForm();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();

  const uniqueId = uuidv4();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const res = await fetch("/api/getuserdata");
        const userData = await res.json();
        setCustomerDetails({
          name: userData.user.name,
          email: userData.user.email,
          address: userData.user.address,
        });
      }
    };
    getUserData();
  }, [user]);

  if (!isLoaded || !userId) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white font-extrabold text-3xl m-3 md:m-10 text-center">
          Ciao! Accedi per ordinare!
        </h1>
        <div className="bg-yellow-100 rounded-sm">
          <SignInButton>
            <button className="text-red-500 mx-4">Accedi</button>
          </SignInButton>
        </div>
      </div>
    );
  }
  const handleCheckout = async (data: any) => {
    setIsSubmitting(true); // Start showing the spinner
    try {
      // console.log(userData);
      const res = await fetch("/api/userorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          orderId: uniqueId,
          userEmail: customerDetails.email,
          userAddress: customerDetails.address,
          products: products,
          price: totalPrice,
          status: "Atesa pagamento",
        }),
      });

      if (res.ok) {
        // const response = await res.json();
        // alert("Order placed successfully!");
        router.push(`/pagamento/${uniqueId}`);
      } else {
        const errorData = await res.json();
        alert(`Error placing order: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    } finally {
      setIsSubmitting(false); // Stop showing the spinner
      // resetCart();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 p-6">
      {totalPrice === 0 ? (
        <div className="text-center text-2xl font-bold mb-6">
          <p>Il tuo carrello è vuoto.</p>
          <p>Aggiungi prodotti al tuo ordine.</p>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleCheckout)}
            className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
          >
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {/* Customer Name */}
            <FormField
              name="name"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      value={customerDetails.name}
                    />
                  </FormControl>
                  <FormDescription>
                    Conferma che questo è il tuo nome.
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Customer Email */}
            <FormField
              name="email"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      value={customerDetails.email}
                    />
                  </FormControl>
                  <FormDescription>
                    Conferma il tuo indirizzo email.
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="m-1">
              <h2>
                <span className="font-bold text-red-500">
                  In questo momento tutti gli ordini devono essere ritirati allo
                  balcone.
                </span>
              </h2>
            </div>
            {/* Customer Address */}
            {/* <FormField
              name="address"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indirizzo di consegna</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      value={customerDetails.address}
                    />
                  </FormControl>
                  <FormDescription>
                    Se necessario, puoi aggiornare il tuo indirizzo di
                    spedizione.
                  </FormDescription>
                </FormItem>
              )}
            /> */}

            {/* Order Summary */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">
                Riepilogo dell&lsquo;ordine
              </h2>
              <ul>
                {products.map((item) => (
                  <li key={item.id} className="flex justify-between py-2">
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>€{item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <ul>
                
                  <li className="flex justify-between py-2 text-sm">
                    <span>
                      Contributo aplicazione
                    </span>
                    <span>€2</span>
                  </li>
              </ul>
              <h3 className="text-lg font-bold mt-4">
                Totale: € {totalPrice.toFixed(2)}
              </h3>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? (
                <ClipLoader size={24} color="#ffffff" /> // Show spinner while submitting
              ) : (
                "Conferma Ordine e Paga"
              )}
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default CheckoutPage;
