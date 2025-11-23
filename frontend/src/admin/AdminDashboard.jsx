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
import { FiUsers, FiPackage, FiShoppingCart, FiStar } from "react-icons/fi";

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
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.total_users,
      icon: FiUsers,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      lightColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Products",
      value: stats.total_products,
      icon: FiPackage,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      lightColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Total Orders",
      value: stats.total_orders,
      icon: FiShoppingCart,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      lightColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Total Reviews",
      value: stats.total_reviews,
      icon: FiStar,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      lightColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.lightColor} p-3 rounded-lg`}>
                <stat.icon className={`text-2xl ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Orders - Large Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm lg:col-span-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Monthly Orders
          </h3>
          <div className="h-64 sm:h-80">
            {salesChart && <Line data={salesChart} options={{ maintainAspectRatio: false }} />}
          </div>
        </div>

        {/* Order Status - Pie Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Order Status
          </h3>
          <div className="h-64">
            {orderStatusChart ? (
              <Pie data={orderStatusChart} options={{ maintainAspectRatio: false }} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No Data Available
              </div>
            )}
          </div>
        </div>

        {/* New Users - Line Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm lg:col-span-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            New Users per Month
          </h3>
          <div className="h-64 sm:h-80">
            {userChart && <Line data={userChart} options={{ maintainAspectRatio: false }} />}
          </div>
        </div>

        {/* Orders & Users Comparison - Bar Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm lg:col-span-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Orders & Users Comparison
          </h3>
          <div className="h-64 sm:h-80">
            {barChart && <Bar data={barChart} options={{ maintainAspectRatio: false }} />}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Recent Orders
          </h3>
        </div>

        {/* Mobile View - Cards */}
        <div className="block sm:hidden">
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <div key={order.id} className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-800">#{order.id}</span>
                  <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded">
                    {order.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">User:</span> {order.user}</p>
                  <p><span className="font-medium">Amount:</span> ${order.total_amount}</p>
                  <p><span className="font-medium">Date:</span> {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No recent orders
            </div>
          )}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      Rs {order.total_amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No recent orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;