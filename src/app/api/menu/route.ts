import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";


// FETCH ALL PRODUCTS
export const GET = async () => {
  try {
    const products = await prisma.product.findMany();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};