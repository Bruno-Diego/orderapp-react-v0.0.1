"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { getOrderList, updateOrderStatus } from "@/lib/orders"; // Funções para buscar pedidos e atualizar status
import { Decimal } from "@prisma/client/runtime/library";

interface Order {
  id: string;
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
      }
    };
    checkAdminRole();
  }, [user, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && typeof isAdmin === "boolean") {
          // Ensure isAdmin has been set
          console.log(user)
          const endpoint = isAdmin ? "/api/adminorders" : `/api/userorders/${user.primaryEmailAddress?.emailAddress}`;
          console.log(`Getting orders list for ${isAdmin ? "admin" : "users"}`);
          const response = await fetch(endpoint);
          const orderData: Order[] = await response.json();
          setOrders(orderData);
        }
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, [isAdmin, user]);

  const handleStatusChange = async (orderId, newStatus) => {
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
            order.id === updatedOrder.id ? updatedOrder : order
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
          <th className="py-3 px-6 text-left">Order ID</th>
          <th className="py-3 px-6 text-left">Date</th>
          <th className="py-3 px-6 text-left">Customer</th>
          <th className="py-3 px-6 text-left">Total Price</th>
          <th className="py-3 px-6 text-left">Status</th>
          {isAdmin && <th className="py-3 px-6 text-center">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="py-4 px-6">{order.id}</td>
            <td className="py-4 px-6">
              {new Date(order.createdAt).toLocaleDateString()}
            </td>
            <td className="py-4 px-6">{order.userEmail}</td>
            <td className="py-4 px-6">€{order.price.toFixed(2)}</td>
            <td className="py-4 px-6">{order.status}</td>
            {isAdmin && (
              <td className="py-4 px-6 text-center">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                  className="bg-gray-200 p-2 rounded-lg"
                >
                  <option value="Atesa pagamento">Atesa pagamento</option>
                  <option value="ricevuto">ricevuto</option>
                  <option value="in cucina">in cucina</option>
                  <option value="preparato">preparato</option>
                  <option value="in consegna">in consegna</option>
                  <option value="consegnato">consegnato</option>
                  <option value="completato">completato</option>
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
