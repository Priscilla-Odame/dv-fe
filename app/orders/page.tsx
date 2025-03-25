"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/helpers/route";

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  totalAmount: number;
  status: string;
  date: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders from the API endpoint
  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>(`${BASE_URL}orders`);
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center p-4">Loading orders...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Customer Name</th>
                <th className="p-2 border">Items</th>
                <th className="p-2 border">Total Amount</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.customerName}</td>
                  <td className="p-2 border">
                    {order.items.map((item) => (
                      <div key={item.name}>
                        {item.name} (x{item.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border">${order.totalAmount.toFixed(2)}</td>
                  <td
                    className={`p-2 border font-bold ${
                      order.status === "Pending"
                        ? "text-yellow-500"
                        : order.status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="p-2 border">{new Date(order.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
