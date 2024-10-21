import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db"; // Ensure the path is correct
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const userCurr = await currentUser();

  if (!userCurr) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const userId = userCurr.id;

  try {
    // Try to find the user in the database
    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      // If user is not found, create a new one
      console.log("User not found in the database! Creating...");

      user = await prisma.user.create({
        data: {
          clerkUserId: userCurr.id,
          name: `${userCurr.firstName} ${userCurr.lastName}`,
          imageUrl: userCurr.imageUrl,
          email: userCurr.emailAddresses[0].emailAddress,
          address: "Si prega di fornire un indirizzo valido per la consegna.",
        },
      });
    }

    console.log("User found or created!");
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
