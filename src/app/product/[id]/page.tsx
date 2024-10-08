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
import { useCartStore } from "@/lib/store"; // Import the cart store
import { useUser } from "@clerk/nextjs";

interface Product {
  id: string;
  title: string;
  catSlug: string;
  desc?: string;
  img?: string;
  price: number | string;
  options?: { title: string; additionalPrice: number }[];
}

type Props = {
  params: { id: string };
};

const ProductPage = ({ params }: Props) => {
  const { user } = useUser(); // Obtém o usuário autenticado
  const [isAdmin, setIsAdmin] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter(); // Initialize useRouter
  const { addToCart } = useCartStore((state) => state); // Get addToCart function from store

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        const response = await fetch("/api/admincheck");
        console.log("response: " + response);
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      }
    };
    checkAdminRole();
  }, [user]);

  const handleIncrease = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
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

  const handleAddToCart = () => {
    if (product) {
      const numericPrice =
        typeof product.price === "string"
          ? parseFloat(product.price)
          : product.price;
      addToCart({
        id: product.id,
        name: product.title,
        price: numericPrice,
        quantity: quantity,
      });
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
          <h1 className="text-3xl font-bold mb-2 text-center">
            {product.title}
          </h1>
          <p className="text-gray-700 text-lg mb-4 text-center">
            {product.desc}
          </p>
          <p className="text-2xl font-bold text-green-600 mb-4 text-center">
            €{product.price}
          </p>
          <div className="flex items-center justify-center m-5 flex-wrap">
            <Button size="icon" onClick={handleDecrease}>
              <BsDashLg className="h-4 w-4" />
            </Button>
            <span className="text-lg m-2">{quantity}</span>
            <Button size="icon" onClick={handleIncrease}>
              <BsPlusLg className="h-4 w-4" />
            </Button>
            <Button
              className="flex items-center mx-4"
              onClick={handleAddToCart}
            >
              <BsBagCheck className="h-6 w-6" />
              <span className="mx-2">Aggiungi</span>
            </Button>
          </div>
          {/* Admin buttons */}
          {isAdmin && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
