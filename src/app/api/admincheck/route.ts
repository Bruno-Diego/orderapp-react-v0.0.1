import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/db"; // Certifique-se de que o caminho está correto
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const user = await currentUser();
//   console.log(user);
  const userId = user?.id;
  
  if (!userId) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });
    
    if (user?.isAdmin === true) {
      return NextResponse.json({ isAdmin: true }, { status: 200 });
    } else {
      return NextResponse.json({ isAdmin: false }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
