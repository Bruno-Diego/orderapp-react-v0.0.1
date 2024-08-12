import React from "react";
import { useEffect, useState } from "react";

import { BsPlusLg } from "react-icons/bs";
import { BsDashLg } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BsBagCheck } from "react-icons/bs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
}

const ItemCard = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/menu");
      //   console.log("response:" + response)
      const data = await response.json();
      //   console.log("data:" + data)
      setProducts(data);
    };

    fetchProducts();
  }, []);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      {products.map((product) => (
        <div className="w-full m-4" key={product.id}>
          <Card className="max-w-lg mt-4 shadow-lg rounded-lg p-4">
            <Link
              href={`/product/${product.id}`}
              key={product.id}
            >
              <CardHeader>
                <div className="flex">
                  {product.img ? (
                    <Image
                      src={product.img}
                      width={500}
                      height={500}
                      alt="Margherita Pizza"
                      className="rounded-full w-24 h-24 object-cover"
                    />
                  ) : (
                    <Skeleton className="h-24 w-24 rounded-full" />
                  )}
                  <div className="ml-4 flex-1 space-y-4">
                    <CardTitle className="text-xl font-bold">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      {product.desc}
                    </CardDescription>
                  </div>
                  <div className="">
                    <p className="text-xl font-bold mb-2">€{product.price}</p>
                  </div>
                </div>
              </CardHeader>
            </Link>
            <CardContent>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <Button size="icon" onClick={decreaseQuantity}>
                    <BsDashLg className="h-4 w-4" />
                  </Button>
                  <span className="text-lg">{quantity}</span>
                  <Button size="icon" onClick={increaseQuantity}>
                    <BsPlusLg className="h-4 w-4" />
                  </Button>
                  <Button className="flex items-center">
                    <BsBagCheck className="h-6 w-6" />
                    <span className="mx-2">Aggiungi</span>
                  </Button>
                  <Button variant="destructive">Delete Product</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ItemCard;

<Card className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md max-w-lg mx-auto mt-4">
  <CardHeader>
    <Image
      src="https://res.cloudinary.com/dd8ske4ub/image/upload/v1723456009/p12_hvaqn2.png"
      width={500}
      height={500}
      alt="Margherita Pizza"
      className="rounded-full w-24 h-24 object-cover"
    />
  </CardHeader>
  <CardContent>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>;
