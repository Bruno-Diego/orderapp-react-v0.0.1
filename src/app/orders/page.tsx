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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        const res = await fetch("/api/admincheck");
        const data = await res.json();
        if (!data.isAdmin) {
          router.push("/"); // Redireciona para a homepage se não for admin
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
        if(isAdmin){
            console.log(isAdmin)
            const response = await fetch(`/api/adminorders`);
            const data: Order[] = await response.json();
            setOrders(data);
        } else {
            const response = await fetch(`/api/userorders`);
            const data: Order[] = await response.json();
            setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, [isAdmin, user]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
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
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-4 px-6">{order.id}</td>
                <td className="py-4 px-6">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-4 px-6">{order.userEmail}</td>
                <td className="py-4 px-6">€{order.price.toFixed(2)}</td>
                <td className="py-4 px-6">{order.status}</td>
                <td className="py-4 px-6 text-center">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="bg-gray-200 p-2 rounded-lg"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListPage;
