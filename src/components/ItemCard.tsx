import React from "react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const ItemCard = () => {
  const pizzaImg =
    "https://res.cloudinary.com/dd8ske4ub/image/upload/v1723456009/p12_hvaqn2.png";
  const [quantity, setQuantity] = useState(4);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <Card className="max-w-lg mx-auto mt-4 shadow-lg rounded-lg p-4">
      <CardHeader>
        <div className="flex">
          <Image
            src="https://res.cloudinary.com/dd8ske4ub/image/upload/v1723456009/p12_hvaqn2.png"
            width={500}
            height={500}
            alt="Margherita Pizza"
            className="rounded-full w-24 h-24 object-cover"
          />
          <div className="ml-4 flex-1 space-y-4">
            <CardTitle className="text-xl font-bold">
              Margherita Pizza
            </CardTitle>
            <CardDescription className="text-gray-500">
              Pizza dough, San marzano tomatoes, Fresh mozzarella balls, Fresh
              basil
            </CardDescription>
          </div>
          <div className="">
            <p className="text-xl font-bold mb-2">$5.99</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-right">
          <div className="flex items-center justify-end space-x-2">
            {/* <IconButton
              icon={<MinusIcon />}
              onClick={decreaseQuantity}
              size="sm"
              colorScheme="blackAlpha"
              variant="outline"
              aria-label="Decrease quantity"
            /> */}
            <span className="text-lg">{quantity}</span>
            {/* <IconButton
              icon={<AddIcon />}
              onClick={increaseQuantity}
              size="sm"
              colorScheme="blackAlpha"
              variant="outline"
              aria-label="Increase quantity"
            />
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              colorScheme="red"
              variant="outline"
              aria-label="Delete item"
            /> */}
          </div>
        </div>
      </CardContent>
      <CardFooter>{/* You can add footer content here if needed */}</CardFooter>
    </Card>
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
