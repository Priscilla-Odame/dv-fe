"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/helpers/route";
import { getAuthHeaders } from "@/hooks/auth.hooks";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react'

interface Order {
  id: string;
  customerName: string;
  payment_items: { name: string; purchase_quantity: number }[];
  totalAmount: number;
  payment_status: string;
  transaction_date: string;
}

export default function OrdersPage() {
  // Using Suspense to handle the async call for search parameters.
  return (
    <Suspense fallback={<p className="text-center my-10">Loading Shop...</p>}>
      <OrdersPageContent />
    </Suspense>
  );
}

function OrdersPageContent() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders from the API endpoint
  const fetchOrders = async () => {
    const reference_num = searchParams.get("reference");
    const treference_num = searchParams.get("trxref");
    try {
      const token = sessionStorage.getItem("a_c")
      let response;
      if (token) {
        response = await axios.get<Order[]>(`${BASE_URL}payment/orders/mypayment`, getAuthHeaders());
      } else {
        response = await axios.get<Order[]>(reference_num || treference_num ? `${BASE_URL}payment/orders/reference?reference=${reference_num || treference_num}` : `${BASE_URL}payment/orders/reference`, getAuthHeaders()); 
      }
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

      {orders?.length === 0 ? (
        <div className="text-center">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Order ID</th>
                {/* <th className="p-2 border">Customer Name</th> */}
                <th className="p-2 border">Items</th>
                <th className="p-2 border">Total Amount</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="p-2 border">{order.id || 1}</td>
                  {/* <td className="p-2 border">{order.customerName}</td> */}
                  <td className="p-2 border">
                    {order.payment_items.map((item) => (
                      <div key={item.name}>
                        {item.name} (x{item.purchase_quantity})
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border">GH₵{order?.totalAmount?.toFixed(2)}</td>
                  <td
                    className={`p-2 border font-bold ${
                      order.payment_status === "Pending"
                        ? "text-yellow-500"
                        : order.payment_status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.payment_status}
                  </td>
                  <td className="p-2 border">{new Date(order?.transaction_date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
