import Image from "next/image";
import starTurkishLogo from "../../public/Star_Turkish_Logo_0.1.png"
import React from "react";

const Logo = () => {
  
  return (
    <div className='relative mx-auto mt-0 p-6 text-center text-white rounded-lg border-white'>
      <Image alt="StarTurkish custom logo" src={starTurkishLogo}/>
    </div>
  );
};

export default Logo;