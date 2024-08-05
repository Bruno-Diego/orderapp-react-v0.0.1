import React from "react";

const Logo = () => {
  
  return (
    <div className='relative mx-auto mt-0 w-64 p-6 text-center text-white rounded-lg border-white'>
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 text-red-500 text-5xl'>★</div>
      <div className='mt-8'>
        <h1 className='text-green-500 text-2xl font-bold'>STAR TURKISH</h1>
        <h2 className='text-yellow-400 text-2xl font-bold'>PIZZA</h2>
        <h3 className='text-red-500 text-2xl font-bold'>& KEBAB</h3>
      </div>
    </div>
  );
};

export default Logo;
