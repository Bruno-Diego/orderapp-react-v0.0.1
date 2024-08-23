"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Decimal } from "@prisma/client/runtime/library";

interface Order {
  id: string;
  orderId: string;
  createdAt: Date;
  price: Decimal;
  products: { id: string; name: string; quantity: number; price: number }[];
  status: string;
  userEmail: string;
}

const OrderListPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        const res = await fetch("/api/admincheck");
        const data = await res.json();
        if (!data.isAdmin) {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } else {
        router.push("/")
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
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">Ordine ID</th>
              <th className="py-3 px-6 text-left">Data</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Totale</th>
              <th className="py-3 px-6 text-left">Stato</th>
              {isAdmin && (
                <th className="py-3 px-6 text-center">Cambia stato</th>
              )}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td className="py-4 px-6">{order.orderId}</td>
                <td className="py-4 px-6">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">{order.userEmail}</td>
                <td className="py-4 px-6">€{Number(order.price).toFixed(2)}</td>
                <td className="py-4 px-6">{order.status}</td>
                {isAdmin &&
                  order.status !== "Atesa pagamento" &&
                  order.status !== "Completato" && (
                    <td className="py-4 px-6 text-center">
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
                    </td>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListPage;
