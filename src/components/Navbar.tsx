"use client";
import React, { useEffect, useState } from "react";
import { FiPhone } from "react-icons/fi";
import Link from "next/link";
import Logo from "./Logo";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { user } = useUser(); // Obtém o usuário autenticado
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        const response = await fetch("/api/admincheck");
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      }
    };
    checkAdminRole();
  }, [user]);

  return (
    <div className="text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:block gap-4">
        <div className="md:flex gap-4 items-center">
          <Link href="/">Homepage</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/contact">Contatto</Link>
        </div>
        {/* Admin Button */}
        {isAdmin && user && (
          <div>
            <Button variant="outline" className="mx-1">
              <Link className="text-red-500" href="/add">
                Aggiungi prodotto
              </Link>
            </Button>
            <Button variant="outline" className="mx-1">
              <Link className="text-red-500" href="/orders">
                Ordine
              </Link>
            </Button>
          </div>
        )}
      </div>
      <div className="md:hidden flex gap-4">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <FaBars />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/">Homepage</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Link href="/menu">Menu</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Link href="/contact">Contatto</Link>
              </MenubarItem>
              {/* Admin Buttons */}
              {isAdmin && user && (
                <div className="">
                  <MenubarItem>
                    <Button variant="outline">
                      <Link className="text-red-500" href="/add">
                        Aggiungi prodotto
                      </Link>
                    </Button>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Button variant="outline">
                      <Link className="text-red-500" href="/orders">
                        ordine
                      </Link>
                    </Button>
                  </MenubarItem>
                </div>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold md:flex-1 md:text-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">{/* <Menu /> */}</div>
      {/* RIGHT LINKS */}
      <div className="">
        <div className="lg:static flex items-center justify-center gap-2 cursor-pointer rounded-md">
          <SignedOut>
            <div className="bg-yellow-100 px-1 my-1 cursor-pointer rounded-md">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <div className="md:flex gap-4 items-center justify-center flex-1">
          <div className="lg:static flex flex-col md:flex-row items-center gap-2 cursor-pointer bg-yellow-100 px-1 rounded-md">
            <FiPhone className="w-6 h-6 md:w-4 md:h-4" />
            <a className="text-xs hidden md:flex" href="tel:+393240560356">
              324 056 0356
            </a>
          </div>
        </div>
        {/* <UserLinks/> */}
        {/* <CartIcon /> */}
        <div className="my-1 flex justify-center">
          <CartDrawer />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
