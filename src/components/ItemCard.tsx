import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BsDashLg,
  BsPlusLg,
  BsBagCheck,
  BsTrash3,
  BsPencilSquare,
} from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

import { useUser } from "@clerk/nextjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/lib/store";

interface Product {
  id: string;
  title: string;
  catSlug: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
}

interface ItemCardProps {
  id: string;
  title: string;
  price: number|string;
  img?: string;
  desc?: string;
}

const ItemCard = ({ id, title, price, img, desc }: ItemCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useUser(); // Obtém o usuário autenticado
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCartStore((state) => state);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        const response = await fetch("/api/admincheck");
        console.log("response: " + response);
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      }
    };
    checkAdminRole();
  }, [user]);

  const handleDelete = async () => {
    if (id) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          router.push("/menu"); // Redirect to menu after deletion
        } else {
          console.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  const handleAddToCart = () => {
    if (id) {
      addToCart({
        id,
        name: title,
        price: numericPrice,
        quantity,
      });
    }
  };

  
  if (!id) {
    return <div className="text-lg text-white">Loading...</div>;
  }

  return (
    <div className="md:w-full m-4" key={id}>
      <Card className="max-w-lg mt-4 shadow-lg rounded-lg md:p-4">
        <Link href={`/product/${id}`} key={id}>
          <CardHeader>
            <div className="md:flex p-0 m-auto">
              {img ? (
                <Image
                  src={img}
                  width={500}
                  height={500}
                  alt="Margherita Pizza"
                  className="rounded-full w-24 h-24 object-cover m-auto"
                />
              ) : (
                <Skeleton className="h-24 w-24 rounded-full" />
              )}
              <div className="md:ml-4 flex-1 md:space-y-4">
                <CardTitle className="text-xl font-bold text-center">
                  {title}
                </CardTitle>
                <CardDescription className="text-gray-500 text-center">
                  {desc}
                </CardDescription>
              </div>
              <div>
                <p className="text-xl font-bold my-2 text-center">€{price}</p>
              </div>
            </div>
          </CardHeader>
        </Link>
        <CardContent>
          <div className="text-right">
            <div className="md:flex items-center space-x-2">
              <div className="flex items-center space-x-2 justify-center">
                <Button size="icon" onClick={decreaseQuantity}>
                  <BsDashLg className="h-4 w-4" />
                </Button>
                <span className="text-lg">{quantity}</span>
                <Button size="icon" onClick={increaseQuantity}>
                  <BsPlusLg className="h-4 w-4" />
                </Button>
                <Button className="flex items-center" onClick={handleAddToCart}>
                  <BsBagCheck className="h-6 w-6" />
                  <span className="mx-2">Aggiungi</span>
                </Button>
              </div>
              {/* Admin Button */}
              {isAdmin && (
                <div className="md:w-1/3 flex justify-center">
                  <Button className="text-white m-1 font-bold py-2 px-4 rounded-lg">
                    <BsPencilSquare className="h-6 w-6" />
                  </Button>
                  <Button
                    className="text-white bg-red-600 hover:bg-red-700 m-1 font-bold py-2 px-4 rounded-lg"
                    onClick={handleDelete}
                  >
                    <BsTrash3 className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemCard;
