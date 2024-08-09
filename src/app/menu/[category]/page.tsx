"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

const getData = async (category: string) => {
  const res = await fetch(
    `http://localhost:3000/api/products?catSlug=${category}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

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
      console.log(response)
      setProducts(data);
    };

    fetchProducts(params.category);
  }, [params.category]);

  return (
    <div className="flex flex-wrap text-red-500">
      <h1>{params.category}</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.catSlug}</p>
          <p>${product.price}</p>
          {product.img && <img src={product.img} alt={product.title} />}
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
