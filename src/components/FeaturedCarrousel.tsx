"use client";
import * as React from "react";

import { useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ItemCard from "./ItemCard";

interface Product {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
}

const FeaturedCarouselComponent = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/featured");
      //   console.log("response:" + response)
      const data = await response.json();
      //   console.log("data:" + data)
      setProducts(data);
    };

    fetchProducts();
  }, []);
  if (!products.length) {
    return <div className="text-lg text-white font-extrabold">Caricando offerte...</div>;
  }
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="-ml-1">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="pl-1 sm:basis-1/2 md:basis-1/3"
          >
            <div className="p-1">
              <ItemCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                img={product.img}
                desc={product.desc}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default FeaturedCarouselComponent;
