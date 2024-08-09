import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // Assuming you're using Prisma

// FETCH FILTERED Products
export async function GET(req: NextRequest) {
  const catSlug = req.nextUrl.searchParams.get('catSlug'); // Correct way to get query parameters in NextRequest

  if (!catSlug) {
    return NextResponse.json({ error: 'catSlug is required' }, { status: 400 });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        catSlug, // Filtering by catSlug
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Unable to fetch products' }, { status: 500 });
  }
}
