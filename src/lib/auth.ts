import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(req: NextRequest) {
  const auth = getAuth(req);

  if (!auth.userId) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const user = await clerkClient.users.getUser(auth.userId);
  if (!user || user.publicMetadata.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return {
    user: {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      role: user.publicMetadata.role || "user", // Assumindo que o role é salvo no publicMetadata
    },
  };
}

export function requireAdmin(req: Request, session: any) {
  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
