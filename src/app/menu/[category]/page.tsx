"use client";

import ItemCard from "@/components/ItemCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  catSlug: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
}

type Props = {
  params: { category: string };
};

const CategoryPage = ({ params }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async (category: string) => {
      const response = await fetch(`/api/products?catSlug=${category}`);
      const data = await response.json();
      console.log(response);
      setProducts(data);
    };

    fetchProducts(params.category);
  }, [params.category]);

  return (
    <main className="min-h-screen flex-col items-center justify-between p-8">
      <h1 className="text-white text-center uppercase scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {params.category}
      </h1>
      <div className="w-full flex-wrap md:flex md:flex-nowrap">
        {products.map((product) => (
          <ItemCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            img={product.img}
            desc={product.desc}
          />
        ))}
      </div>
    </main>
  );
};

export default CategoryPage;
