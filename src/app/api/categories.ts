import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Fetching categories...")
    const categories = await prisma.category.findMany()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch categories' })
  } finally {
    await prisma.$disconnect()
  }
}
