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
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-white">List of products:</h1>
      <div className="w-full flex-wrap md:flex md:flex-nowrap">
        <ItemCard />
      </div>
    </main>
  );
};

export default MenuPage;
