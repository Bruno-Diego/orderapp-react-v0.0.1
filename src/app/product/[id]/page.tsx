"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For redirecting after delete
import React, { useEffect, useState } from "react";
import {
  BsBagCheck,
  BsDashLg,
  BsPencilSquare,
  BsPlusLg,
  BsTrash3,
} from "react-icons/bs";

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
  const [quantity, setQuantity] = useState(1);
  const router = useRouter(); // Initialize useRouter

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    if (params.id) {
      fetchProduct(params.id);
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (product) {
      try {
        const response = await fetch(`/api/products/${product.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          router.push("/menu"); // Redirect to menu after deletion
        } else {
          console.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  if (!product) {
    return <div className="text-lg text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-6 flex justify-center items-center">
      <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Product Image */}
        <div className="relative m-5">
          {product.img && (
            <Image
              src={product.img}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {/* Product Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 text-lg mb-4">{product.desc}</p>
          <p className="text-2xl font-bold text-green-600 mb-4">
            €{product.price}
          </p>
          <div className="flex items-center justify-around md:justify-center m-5 flex-wrap">
            <Button size="icon" onClick={handleDecrease}>
              <BsDashLg className="h-4 w-4" />
            </Button>
            <span className="text-lg m-2">{quantity}</span>
            <Button size="icon" onClick={handleIncrease}>
              <BsPlusLg className="h-4 w-4" />
            </Button>
            <Button className="flex items-center mx-4">
              <BsBagCheck className="h-6 w-6" />
              <span className="mx-2">Aggiungi</span>
            </Button>
            {/* Admin buttons */}
          </div>
          <div className="flex justify-around my-5 flex-wrap">
            {/* Edit Button */}
            <Link href={`/product/${product.id}/edit`}>
              <Button>
                <BsPencilSquare className="h-6 w-6 mr-2" />
                Edit
              </Button>
            </Link>
            {/* Delete Button */}
            <Button variant="destructive" onClick={handleDelete}>
              <BsTrash3 className="h-6 w-6 mr-2" />
              Delete Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
