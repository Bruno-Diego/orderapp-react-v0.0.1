"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const getData = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product data!");
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
  params: { id: string };
};

const ProductPage = ({ params }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data: Product = await response.json(); // Ensure getData returns a Product
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null); // Optional: set product to null in case of an error
      }
    };
  
    if (params.id) { // Ensure params.id is defined before calling fetchProduct
      fetchProduct(params.id);
    }
  }, [params.id]);
  
  if (!product) {
    return <div className="text-lg text-white">Loading...</div>;
  }
  


  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-lg text-white">{product.catSlug}</p>
      <p className="text-xl font-semibold">${product.price}</p>
      {product.img && (
        <Image
          src={product.img}
          alt={product.title}
          width={500}
          height={500}
          className="my-4"
        />
      )}
      <p className="text-md">{product.desc}</p>
      {product.options && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Options:</h3>
          <ul className="list-disc list-inside">
            {product.options.map((option, index) => (
              <li key={index}>
                {option.title} (+${option.additionalPrice})
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link href={`/category/${product.catSlug}`}>
        <div className="text-blue-500 underline mt-4 block">Back to category</div>
      </Link>
    </div>
  );
};

export default ProductPage;
