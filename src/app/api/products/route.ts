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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    // Verifica se todos os campos necessários foram preenchidos
    if (!body.title || !body.desc || !body.price || !body.catSlug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Cria o novo produto no banco de dados
    const newProduct = await prisma.product.create({
      data: body,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
