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

// Create a product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // console.log(body)
    // Verifica se todos os campos necessários foram preenchidos
    // if (!body.title || !body.desc || !body.price || !body.catSlug) {
    //   return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    // }

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

// Update an existing product
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body; // Extract the product ID and the rest of the product data

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    console.log(data)
    // Update the product in the database
    const updatedProduct = await prisma.product.update({
      where: { id }, // Find the product by its ID
      data, // Update the product with the provided data
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

