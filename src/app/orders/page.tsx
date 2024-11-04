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

const OrderListPage = () => {
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
            ? "/api/adminorders"
            : `/api/userorders/${user.primaryEmailAddress?.emailAddress}`;
          // console.log(`Getting orders list for ${isAdmin ? "admin" : "users"}`);
          const response = await fetch(endpoint);
          const orderData: Order[] = await response.json();
          // console.log(orderData)
          setOrders(orderData);
        }
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, [isAdmin, user]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/adminorders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white rounded-lg shadow-md">
          <TableHeader>
            <TableRow>
              {/* <th className="py-3 px-6 text-left">Ordine ID</th> */}
              <TableHead className="p-1 text-xs md:text-base md:py-3 md:px-6 text-left min-w-[100px]">
                Cliente
              </TableHead>
              {/* <th className="py-3 px-6 text-left">Email</th> */}
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
              {isAdmin && (
                <TableHead className="p-1 text-xs md:text-base md:py-3 md:px-6 text-center">
                  Cambia stato
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                {/* <td className="py-4 px-6">{order.orderId}</td> */}
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

                {/* <td className="py-4 px-6">{order.userEmail}</td> */}
                <TableCell className="p-1 text-xs md:text-base md:py-3 md:px-6">
                  {/* Map through the products array to display the product names */}
                  {order.products.map((product) => (
                    <span className="text-nowrap border border-slate-200/50 p-1 " key={product.id}>
                      {product.quantity}x {product.name} <br />
                      {/* Optionally add a comma if there are multiple products */}
                    </span>
                  ))}
                  <br />
                  {/* Display the order price */}
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
                {isAdmin &&
                  order.status !== "Atesa pagamento" &&
                  order.status !== "Completato" && (
                    <TableCell className="p-1 text-xs md:text-base md:py-3 md:px-6 text-center">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.orderId, e.target.value)
                        }
                        className="bg-gray-200 p-2 rounded-lg"
                      >
                        <option value="">Cambia stato</option>
                        <option value="Ricevuto">ricevuto</option>
                        <option value="In cucina!">in cucina</option>
                        <option value="Preparato!">preparato</option>
                        <option value="In consegna">in consegna</option>
                        <option value="Consegnato">consegnato</option>
                        <option value="Completato">completato</option>
                      </select>
                    </TableCell>
                  )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderListPage;
