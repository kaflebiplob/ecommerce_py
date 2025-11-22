import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar, Pie } from "react-chartjs-2";
import api from "../api/api";

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    total_products: 0,
    total_orders: 0,
    total_reviews: 0,
  });

  const [salesChart, setSalesChart] = useState(null);
  const [userChart, setUserChart] = useState(null);
  const [barChart, setBarChart] = useState(null);
  const [orderStatusChart, setOrderStatusChart] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  const loadDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard/stats/");
      const data = response.data;

      setStats({
        total_users: data.total_users,
        total_products: data.total_products,
        total_orders: data.total_orders,
        total_reviews: data.total_reviews,
      });

      setRecentOrders(data.recent_orders);

      setSalesChart({
        labels: data.chart_data.months,
        datasets: [
          {
            label: "Monthly Orders",
            data: data.chart_data.order_counts,
            borderColor: "#10b981",
            backgroundColor: "rgba(16,185,129,0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      });

      setUserChart({
        labels: data.chart_data.months,
        datasets: [
          {
            label: "New Users",
            data: data.chart_data.user_counts,
            borderColor: "#6366f1",
            backgroundColor: "rgba(99,102,241,0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      });

      setBarChart({
        labels: data.chart_data.months,
        datasets: [
          {
            label: "Orders",
            data: data.chart_data.order_counts,
            backgroundColor: "rgba(16,185,129,0.6)",
          },
          {
            label: "New Users",
            data: data.chart_data.user_counts,
            backgroundColor: "rgba(99,102,241,0.6)",
          },
        ],
      });

      const statusCounts = {};
      data.recent_orders.forEach((o) => {
        statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
      });

      setOrderStatusChart({
        labels: Object.keys(statusCounts),
        datasets: [
          {
            data: Object.values(statusCounts),
            backgroundColor: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"],
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-5 bg-emerald-600 text-white rounded-lg">
          <h2>Total Users</h2>
          <p className="text-3xl">{stats.total_users}</p>
        </div>

        <div className="p-5 bg-indigo-600 text-white rounded-lg">
          <h2>Total Products</h2>
          <p className="text-3xl">{stats.total_products}</p>
        </div>

        <div className="p-5 bg-orange-600 text-white rounded-lg">
          <h2>Total Orders</h2>
          <p className="text-3xl">{stats.total_orders}</p>
        </div>

        <div className="p-5 bg-purple-600 text-white rounded-lg">
          <h2>Total Reviews</h2>
          <p className="text-3xl">{stats.total_reviews}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <h3 className="text-xl mb-4">Monthly Orders</h3>
          {salesChart && <Line data={salesChart} />}
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl mb-4">Order Status</h3>
          {orderStatusChart ? <Pie data={orderStatusChart} /> : "No Data"}
        </div>

        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <h3 className="text-xl mb-4">New Users per Month</h3>
          {userChart && <Line data={userChart} />}
        </div>

        <div className="bg-white p-6 rounded-xl shadow col-span-3">
          <h3 className="text-xl mb-4">Orders & Users Comparison</h3>
          {barChart && <Bar data={barChart} />}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl mb-4">Recent Orders</h3>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="p-2">#{o.id}</td>
                <td className="p-2">{o.user}</td>
                <td className="p-2">${o.total_amount}</td>
                <td className="p-2">{o.status}</td>
                <td className="p-2">
                  {new Date(o.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
