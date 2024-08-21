"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useCartStore } from "@/lib/store"; // Adjust import path as needed
import { Button } from "@/components/ui/button"; // Adjust import path as needed

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CheckoutPage: React.FC = () => {
  const { products, totalPrice } = useCartStore();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  const methods = useForm();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = async (data: any) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerDetails: data,
          cart: products,
          total: totalPrice,
        }),
      });

      if (res.ok) {
        const response = await res.json();
        alert("Order placed successfully!");
        if (isMounted) {
          router.push("/order-confirmation");
        }
      } else {
        const errorData = await res.json();
        alert(`Error placing order: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
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
                  />
                </FormControl>
                <FormDescription>Inserisci il tuo nome.</FormDescription>
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
                  />
                </FormControl>
                <FormDescription>Inserisci la tua email.</FormDescription>
              </FormItem>
            )}
          />

          {/* Customer Address */}
          <FormField
            name="address"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indirizzo</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </FormControl>
                <FormDescription>
                  Inserisci il tuo indirizzo di spedizione.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Order Summary */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Riepilogo Ordine</h2>
            <ul>
              {products.map((item) => (
                <li key={item.id} className="flex justify-between py-2">
                  <span>
                    {item.name} - {item.quantity} x €{item.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-bold mt-4">
              Totale: €{totalPrice.toFixed(2)}
            </h3>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Completa Ordine
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CheckoutPage;
