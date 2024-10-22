"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ItemCard from "@/components/ItemCard";

interface Product {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
  catSlug?: string;
}

interface ProductGroups {
  [key: string]: Product[];
}

const MenuPage = () => {
  const [productGroups, setProductGroups] = useState<ProductGroups>({});

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/menu");
      const data: Product[] = await response.json();

      // Group products by category slug (catSlug)
      const groupedProducts = data.reduce(
        (groups: ProductGroups, product: Product) => {
          const category = product.catSlug || "Uncategorized"; // Handle products without catSlug
          if (!groups[category]) {
            groups[category] = [];
          }
          groups[category].push(product);
          return groups;
        },
        {}
      );

      setProductGroups(groupedProducts);
    };

    fetchProducts();
  }, []);

  function composeHeader(category: string){
    switch(category){
      case "panini":
        return "Panini e Piadine"
      case "menu_specialita":
        return "Menu Specialita"
      case "asporto":
        return "Piatti da Asporto"
      default:
        return category
    }
  }

  // Define the specific order for category slugs
  const categoryOrder = [
    "pizze",
    "calzoni",
    "pizzette",
    "panini",
    "asporto", // piatti da asporto
    "fritture",
    "insalate",
    "menu_specialita",
    "dolci",
    "bevande",
  ];

  return (
    <main className="min-h-screen w-full flex-col items-center justify-between md:p-8">
      <h1 className="text-white text-center p-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Esplora nostri prodotti
      </h1>

      {categoryOrder.map((category) =>
        productGroups[category] ? (
          <div key={category} className="w-full mt-8">
            {/* Category Heading */}
            <h2 className="text-white text-3xl font-bold mb-4 uppercase bg-red-500 text-center">
              {composeHeader(category)}
            </h2>

            <div className="flex items-center flex-wrap md:w-full">
              {productGroups[category].map((product) => (
                <ItemCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  img={product.img}
                  desc={product.desc}
                  catSlug={product.catSlug}
                />
              ))}
            </div>
          </div>
        ) : null // Skip categories without products
      )}
    </main>
  );
};

export default MenuPage;
