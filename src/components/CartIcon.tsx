"use client";

import { useCartStore } from "@/lib/store";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { TiShoppingCart } from "react-icons/ti";

const CartIcon = () => {
  const { totalItems } = useCartStore();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  // A verificação é necessária para garantir que os dados do usuário sejam carregados corretamente
  if (!isLoaded) return null;

  return (
    <Link href="/cart">
      <div className="flex items-center m-1 justify-center">
        <div className="flex bg-yellow-100 rounded-sm items-center justify-center">
          <div className="relative w-8 h-8 md:w-5 md:h-5">
            <TiShoppingCart />
          </div>
          <span>Cart ({totalItems})</span>
        </div>
      </div>
    </Link>
  );
};

export default CartIcon;
