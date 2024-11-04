"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Decimal } from "@prisma/client/runtime/library";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Order {
  id: string;
  orderId: string;
  name: string;
  createdAt: Date;
  price: Decimal;
  products: { id: string; name: string; quantity: number; price: number }[];
  status: string;
  userEmail: string;
  messageToChef: string;
}

const ComplOrdersListPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user && user !== undefined) {
        const res = await fetch("/api/admincheck");
        const data = await res.json();
        if (!data.isAdmin) {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } else if (user !== undefined) {
        router.push("/");
      }
    };
    checkAdminRole();
  }, [user, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && typeof isAdmin === "boolean") {
          // Ensure isAdmin has been set
          const endpoint = isAdmin
            ? "/api/adminorders/completed"
            : `/api/userorders/${user.primaryEmailAddress?.emailAddress}`;
          
          const response = await fetch(endpoint);
          const orderData: Order[] = await response.json();

          // Filter only "Completato" orders
          const completedOrders = orderData.filter(order => order.status === "Completato");

          setOrders(completedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, [isAdmin, user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Ordine Completate</h1>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white rounded-lg shadow-md">
          <TableHeader>
            <TableRow>
              <TableHead className="p-1 text-xs md:text-base md:py-3 md:px-6 text-left min-w-[100px]">
                Cliente
              </TableHead>
              <TableHead className="p-1 text-xs md:text-base md:py-3 md:px-6 text-left">
                Ordine
              </TableHead>
              {isAdmin && (
                <TableHead className="p-1 text-xs md:text-base md:py-3 md:px-6 text-center">
                  Personalizzazioni
                </TableHead>
              )}
              <TableHead className="p-1 text-xs md:text-base md:py-3 md:px-6 text-left">
                Stato
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell className="p-1 text-xs md:text-base md:py-3 md:px-6 break-all">
                  <span>
                    <b>Nome: </b>
                    {order.name}
                  </span>{" "}
                  <br />
                  <span>
                    <b>E-mail: </b>
                    {order.userEmail}
                  </span>{" "}
                  <br />
                  <span>
                    <b>Data e ora: </b>
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </TableCell>

                <TableCell className="p-1 text-xs md:text-base md:py-3 md:px-6">
                  {order.products.map((product) => (
                    <span className="text-nowrap border border-slate-200/50 p-1" key={product.id}>
                      {product.quantity}x {product.name} <br />
                    </span>
                  ))}
                  <br />
                  {"TOTALE: "}€{Number(order.price).toFixed(2)}
                </TableCell>
                {isAdmin && (
                  <TableCell className="p-1 text-xs md:text-base md:py-3 md:px-6 max-w-5 break-all">
                    <span className="border border-red-200/50 p-1 leading-6 md:leading-7">{order.messageToChef}</span>
                  </TableCell>
                )}
                <TableCell className="p-1 text-xs md:text-base md:py-3 md:px-6">
                  {order.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ComplOrdersListPage;
