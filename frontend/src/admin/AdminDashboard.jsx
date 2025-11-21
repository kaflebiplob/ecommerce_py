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
  const [stats, setStats] = useState({
    total_users: 0,
    total_products: 0,
    total_orders: 0,
    total_reviews: 0,
  });
  const [salesChart, setSalesChart] = useState(null);
  const [userChart, setUserChart] = useState(null);
  const [orderStatusChart, setOrderStatusChart] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      // Single API call to get all dashboard data
      const response = await api.get("/admin/dashboard/stats/");
      const data = response.data;
      
      // Set basic stats
      setStats({
        total_users: data.total_users,
        total_products: data.total_products,
        total_orders: data.total_orders,
        total_reviews: data.total_reviews,
      });

      // Set recent orders
      setRecentOrders(data.recent_orders || []);

      // Create order status pie chart from recent orders
      if (data.recent_orders && data.recent_orders.length > 0) {
        const statusCounts = {};
        data.recent_orders.forEach(order => {
          statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
        });

        const statusColors = {
          'pending': '#f59e0b',
          'completed': '#10b981',
          'processing': '#3b82f6',
          'cancelled': '#ef4444',
          'shipped': '#8b5cf6'
        };

        setOrderStatusChart({
          labels: Object.keys(statusCounts),
          datasets: [
            {
              data: Object.values(statusCounts),
              backgroundColor: Object.keys(statusCounts).map(status => 
                statusColors[status] || '#6b7280'
              ),
              borderWidth: 2,
              borderColor: '#fff',
            },
          ],
        });
      }

      // Create sales chart from monthly orders data
      if (data.chart_data && data.chart_data.months) {
        setSalesChart({
          labels: data.chart_data.months,
          datasets: [
            {
              label: "Monthly Sales",
              data: data.chart_data.sales || data.chart_data.order_counts,
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        });

        // Create user chart from monthly users data
        setUserChart({
          labels: data.chart_data.user_months || data.chart_data.months,
          datasets: [
            {
              label: "New Users",
              data: data.chart_data.user_counts,
              borderColor: "#6366f1",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        });
      } else {
        // Fallback: use the original monthly_orders and monthly_new_users arrays
        const monthlyOrders = data.monthly_orders || [];
        const monthlyUsers = data.monthly_new_users || [];
        
        setSalesChart({
          labels: monthlyOrders.map(item => new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })),
          datasets: [
            {
              label: "Monthly Orders",
              data: monthlyOrders.map(item => item.count),
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        });

        setUserChart({
          labels: monthlyUsers.map(item => new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })),
          datasets: [
            {
              label: "New Users",
              data: monthlyUsers.map(item => item.count),
              borderColor: "#6366f1",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        });
      }
    } catch (error) {
      console.log("Dashboard Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-emerald-600 text-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl mt-2">{stats.total_users}</p>
        </div>

        <div className="p-6 bg-indigo-600 text-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-3xl mt-2">{stats.total_products}</p>
        </div>

        <div className="p-6 bg-orange-600 text-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl mt-2">{stats.total_orders}</p>
        </div>

        <div className="p-6 bg-purple-600 text-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Reviews</h2>
          <p className="text-3xl mt-2">{stats.total_reviews}</p>
        </div>
      </div>

      {/* CHARTS - Now 3 columns for better layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Orders Chart */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Monthly Orders</h3>
          {salesChart ? (
            <Line 
              data={salesChart} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                  }
                }
              }}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">No sales data available</div>
          )}
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Order Status</h3>
          {orderStatusChart ? (
            <Pie 
              data={orderStatusChart}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                      }
                    }
                  }
                }
              }}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">No order status data available</div>
          )}
        </div>

        {/* New Users Chart */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">New Users per Month</h3>
          {userChart ? (
            <Line 
              data={userChart} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                  }
                }
              }}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">No user data available</div>
          )}
        </div>

        {/* Additional Pie Chart - Product Categories (if available) */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-700 font-medium">Active Users</span>
              <span className="text-blue-700 font-bold">{stats.total_users}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-green-700 font-medium">Total Products</span>
              <span className="text-green-700 font-bold">{stats.total_products}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-orange-700 font-medium">Total Orders</span>
              <span className="text-orange-700 font-bold">{stats.total_orders}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-purple-700 font-medium">Total Reviews</span>
              <span className="text-purple-700 font-bold">{stats.total_reviews}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS TABLE */}
      {recentOrders.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
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
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${order.total_amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                          'bg-red-100 text-red-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

//   // Line Chart Data
//   const salesData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Sales (USD)",
//         data: [1200, 1900, 3000, 2500, 3200, 4000],
//         fill: false,
//         borderColor: "#10b981",
//         tension: 0.3,
//       },
//     ],
//   };

//   // Bar Chart Data
//   const usersData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//     datasets: [
//       {
//         label: "New Users",
//         data: [30, 45, 28, 60, 75],
//         backgroundColor: "#3b82f6",
//       },
//     ],
//   };

//   // Pie Chart Data
//   const ordersData = {
//     labels: ["Completed", "Pending", "Cancelled"],
//     datasets: [
//       {
//         data: [65, 25, 10],
//         backgroundColor: ["#10b981", "#fbbf24", "#ef4444"],
//       },
//     ],
//   };

//   return (
//     <div className="space-y-10">
//       {/* Heading */}
//       <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="p-6 bg-white shadow rounded-xl border-l-4 border-emerald-500">
//           <h2 className="text-gray-500 text-sm">Total Users</h2>
//           <p className="text-3xl font-semibold mt-2">1,245</p>
//         </div>

//         <div className="p-6 bg-white shadow rounded-xl border-l-4 border-blue-500">
//           <h2 className="text-gray-500 text-sm">Total Orders</h2>
//           <p className="text-3xl font-semibold mt-2">530</p>
//         </div>

//         <div className="p-6 bg-white shadow rounded-xl border-l-4 border-yellow-500">
//           <h2 className="text-gray-500 text-sm">Revenue</h2>
//           <p className="text-3xl font-semibold mt-2">$12,400</p>
//         </div>

//         <div className="p-6 bg-white shadow rounded-xl border-l-4 border-red-500">
//           <h2 className="text-gray-500 text-sm">Pending Tickets</h2>
//           <p className="text-3xl font-semibold mt-2">18</p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Line Chart */}
//         <div className="p-6 bg-white shadow rounded-xl col-span-2">
//           <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
//           <Line data={salesData} />
//         </div>

//         {/* Pie Chart */}
//         <div className="p-6 bg-white shadow rounded-xl">
//           <h3 className="text-lg font-semibold mb-4">Orders Status</h3>
//           <Pie data={ordersData} />
//         </div>
//       </div>

//       {/* Bar Chart */}
//       <div className="bg-white p-6 shadow rounded-xl">
//         <h3 className="text-lg font-semibold mb-4">Users Growth</h3>
//         <Bar data={usersData} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
