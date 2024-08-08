"use client";
import * as React from "react";

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

const CarouselComponent = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
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
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 sm:basis-1/2 md:basis-1/3">
            <div className="p-1">
              <Card>
                <CardHeader>
                  <CardTitle>PANINO KEBAP MENU</CardTitle>
                  <CardDescription>
                    Panino kebap, patatine fritte, lattina 33 cl.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">Offerta #{index + 1}</span>
                  <br />
                  <span className="text-2xl font-semibold">€8,00</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselComponent;
