import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="border-t-2 bg-background border-red-500 w-full flex flex-col ">
      {/* LOGO */}
      <div className="w-80 mx-auto">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="mx-auto">
        <ul className="flex text-white">
          <li className="m-2">
            <div>
              <Link
                target="_blank"
                href="https://www.instagram.com/star_turkish_pizza_kebap/"
              >
                <i className="fa-brands fa-instagram fa-2xl"></i>
              </Link>
            </div>
          </li>
          {/* <li className="m-2">
            <div>
              <Link target="_blank" href="https://wa.me/393240560356">
                <i className="fa-brands fa-whatsapp fa-2xl"></i>
              </Link>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
