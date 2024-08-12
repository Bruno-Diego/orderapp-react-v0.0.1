"use client";
import React from "react";

import { useEffect, useState } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import ItemCard from "@/components/ItemCard";

interface Product {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
}

const MenuPage = () => {
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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full my-4 md:flex md:flex-wrap">
        <h1 className="text-white">List of products:</h1>
        {products.map((product) => (
          <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2"
          style={{ backgroundImage: `url(${product.img})` }}
          >
            <h1 className="text-white" key={product.id}>
              {product.title}
            </h1>
          </Link>
        ))}
        <ItemCard />
      </div>
    </main>
  );
};

export default MenuPage;
