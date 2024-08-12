import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // Make sure this path is correct based on your project structure

// Handler to fetch product by ID
export async function GET(req: NextRequest) {
  // Extract the id from the URL
  const id = req.nextUrl.pathname.split('/').pop(); // Extract the last part of the path

  if (!id) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  try {
    // Fetch the product from the database using Prisma
    const product = await prisma.product.findUnique({
      where: { id: id as string },
    });

    // If no product is found, return a 404 response
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Return the product as JSON
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Unable to fetch product' }, { status: 500 });
  }
}
