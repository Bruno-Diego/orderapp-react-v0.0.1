import React, { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store"; // Regola il percorso secondo necessità
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"; // Adatta per il componente Drawer della tua libreria
import { Button } from "@/components/ui/button"; // Sostituisci con il pulsante della tua libreria di UI
import { BsTrash } from "react-icons/bs"; // Icona per il pulsante di rimozione
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  img?: string;
  quantity: number;
}

interface Cart {
  products: Product[];
  totalItems: number;
  totalPrice: number;
}

const CartDrawer = () => {
  // Ottieni lo stato del carrello dallo store
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();

  const router = useRouter()
  // UseState para controlar a reidratação
  const [isHydrated, setIsHydrated] = useState(false);

  // Verifica se o Zustand foi reidratado
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <p>Loading...</p>; // Ou qualquer outra UI enquanto o Zustand hidrata
  }

  // Funzione per garantire che `totalPrice` e `product.price` siano numeri
  const formatPrice = (price: string | number) => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return numericPrice.toFixed(2);
  };

  // Funzione per gestire la rimozione di un elemento
  const handleRemove = (product: Product) => {
    removeFromCart(product); // Regola la quantità secondo necessità
  };
  console.log("Products: " + products);
  const handleCheckout = () => {
    router.push("/checkout");
  };
  return (
    <Drawer>
      <DrawerTrigger>Apri Carrello ({totalItems})</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="relative">
          <DrawerTitle className="text-white">Il tuo carrello</DrawerTitle>
          <DrawerDescription className="text-white">
            Rivedi gli articoli che hai aggiunto al carrello.
          </DrawerDescription>
        </DrawerHeader>
        <div className="drawer-body px-4">
          {totalItems === 0 ? (
            <p className="text-white">Il tuo carrello è vuoto.</p>
          ) : (
            <ul className="text-white px-4 md:flex">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="cart-item flex md:flex-1 md:mx-2 md: justify-between items-center py-2"
                >
                  <Card className="w-full flex max-w-lg shadow-lg rounded-lg items-center">
                    <Link
                      href={`/product/${product.id}`}
                      key={product.id}
                      className="flex-1"
                    >
                      <CardHeader className="p-2">
                        <div className="flex p-0 md:items-center">
                          {product.img ? (
                            <Image
                              src={product.img}
                              width={500}
                              height={500}
                              alt={product.name}
                              className="rounded-full md:w-24 md:h-24 w-12 h-12 object-cover"
                            />
                          ) : (
                            <Skeleton className="h-24 w-24 rounded-full" />
                          )}
                          <div className="mx-2 flex flex-col flex-1 md:space-y-4 md:mx-4">
                            <CardTitle className="text-xl font-bold text-center">
                              <span>{product.name}</span>
                            </CardTitle>
                            <CardDescription className="text-gray-500 text-center">
                              <span className="ml-2">
                                Quantità: {product.quantity}
                              </span>
                            </CardDescription>
                          </div>
                          <div>
                            <p className="text-xl font-bold my-2 text-center">
                              € {formatPrice(product.price)}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemove(product)}
                      className="m-2"
                    >
                      <BsTrash className="h-5 w-5" />
                    </Button>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
        <DrawerFooter className="text-white text-center">
          <span>Prezzo Totale: €{formatPrice(totalPrice)}</span>
          <DrawerClose className="absolute top-0 right-0 m-2">
            <Button variant="outline">X</Button>
          </DrawerClose>
          <div className="">
            <Button variant="outline" onClick={handleCheckout}>
              Vai al pagamento
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
