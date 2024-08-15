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
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/contact">Contatto</Link>
        {/* Admin Button */}
        {isAdmin && (
          <Button variant="outline">
            <Link className="text-red-500" href="/add">
              Aggiungi prodotto
            </Link>
          </Button>
        )}
      </div>
      <div className="md:hidden flex gap-4 flex-1">
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
              <MenubarItem>
                {/* Admin Button */}
                {isAdmin && (
                  <Button variant="outline">
                    <Link className="text-red-500" href="/add">
                      Aggiungi prodotto
                    </Link>
                  </Button>
                )}
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">{/* <Menu /> */}</div>
      {/* RIGHT LINKS */}
      <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-yellow-100 px-1 rounded-md">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-yellow-100 px-1 rounded-md">
          <FiPhone />
          <a href="tel:+393240560356" className="">
            324 056 0356
          </a>
        </div>
        {/* <UserLinks/>
        <CartIcon /> */}
      </div>
    </div>
  );
};

export default Navbar;
