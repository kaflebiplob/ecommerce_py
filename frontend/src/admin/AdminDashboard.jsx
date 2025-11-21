import React, { useState } from "react";
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

// Register all charts
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
  // const[stats, setStats]=useState({
  //   users:0,
  //   products:0,
  //   orders:0,
  // });
  // const[salesChart,setSalesChart]=useState(null);
  // const[userChart,setUserChart]=useState(null);

  // const loadDashboard
  // Line Chart Data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales (USD)",
        data: [1200, 1900, 3000, 2500, 3200, 4000],
        fill: false,
        borderColor: "#10b981",
        tension: 0.3,
      },
    ],
  };

  // Bar Chart Data
  const usersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "New Users",
        data: [30, 45, 28, 60, 75],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  // Pie Chart Data
  const ordersData = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["#10b981", "#fbbf24", "#ef4444"],
      },
    ],
  };

  return (
    <div className="space-y-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow rounded-xl border-l-4 border-emerald-500">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-3xl font-semibold mt-2">1,245</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-3xl font-semibold mt-2">530</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl border-l-4 border-yellow-500">
          <h2 className="text-gray-500 text-sm">Revenue</h2>
          <p className="text-3xl font-semibold mt-2">$12,400</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl border-l-4 border-red-500">
          <h2 className="text-gray-500 text-sm">Pending Tickets</h2>
          <p className="text-3xl font-semibold mt-2">18</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Line Chart */}
        <div className="p-6 bg-white shadow rounded-xl col-span-2">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <Line data={salesData} />
        </div>

        {/* Pie Chart */}
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Orders Status</h3>
          <Pie data={ordersData} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 shadow rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Users Growth</h3>
        <Bar data={usersData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
