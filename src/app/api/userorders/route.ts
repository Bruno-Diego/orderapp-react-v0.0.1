// import { prisma } from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";

// // FETCH USER ORDERS
// export const GET = async (req: NextRequest) => {
//     try {
//       const orders = await prisma.order.findMany({
//         where: {
//           userEmail: session.user.email!,
//         },
//       });
//       return new NextResponse(JSON.stringify(orders), { status: 200 });
//     } catch (err) {
//       console.log(err);
//       return new NextResponse(
//         JSON.stringify({ message: "Something went wrong!" }),
//         { status: 500 }
//       );
//     }
// };

// // CREATE ORDER
// export const POST = async (req: NextRequest) => {
//     try {
//       const body = await req.json();
//       const order = await prisma.order.create({
//         data: body,
//       });
//       return new NextResponse(JSON.stringify(order), { status: 201 });
//     } catch (err) {
//       console.log(err);
//       return new NextResponse(
//         JSON.stringify({ message: "Something went wrong!" }),
//         { status: 500 }
//       );
//     }
// };