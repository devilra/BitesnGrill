import { useEffect, useState } from "react";
import API from "../../api";
import { CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await API.get("/analytics");
        console.log(data);

        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10">
        <CircularProgress />
      </p>
    );
  }

  // Format monthlyTrend: ensure every month is present
  const formattedTrend = [];

  const trendMap = {};

  analytics.monthlyTrend.forEach((item) => {
    trendMap[item.month] = item.count;
  });

  console.log(trendMap);

  const months = [];
  if (analytics.monthlyTrend.length > 0) {
    const first = new Date(analytics.monthlyTrend[0].month + "-01");
    // console.log(first);
    const last = new Date(
      analytics.monthlyTrend[analytics.monthlyTrend.length - 1].month + "-01"
    );
    // console.log(last);
    let cur = new Date(first);
    while (cur <= last) {
      const monthStr = `${cur.getFullYear()} - ${String(
        cur.getMonth() + 1
      ).padStart(2, "0")}`;
      formattedTrend.push({
        month: monthStr,
        count: trendMap[monthStr] || 0,
      });
      cur.setMonth(cur.getMonth() + 1);
    }
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold"> Dashboard Analytics</h1>
      <div className="grid grid-col-1 md:grid-cols-4 gap-4">
        <div className="bg-rose-200/30 border text-rose-600 hover:shadow-md shadow-rose-600/10 transition-all ease-in-out duration-300 border-rose-500/40  rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold ">Total Blogs</h2>
          <p className="text-2xl font-bold mt-2">{analytics.totalBlogs}</p>
        </div>
        <div className="bg-neutral-200/30 border text-neutral-600 hover:shadow-md shadow-neutral-600/10 transition-all ease-in-out duration-300 border-neutral-500/40  rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold ">Total Users</h2>
          <p className="text-2xl font-bold mt-2">{analytics.totalUsers}</p>
        </div>
        <div className="bg-indigo-200/30 border text-indigo-600 hover:shadow-md shadow-indigo-600/10 transition-all ease-in-out duration-300 border-indigo-500/40  rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold ">Blogs by Admin</h2>
          <p className="text-2xl font-bold mt-2">{analytics.blogsByAdmin}</p>
        </div>
        <div className="bg-yellow-200/30 border text-yellow-600 hover:shadow-md shadow-yellow-600/10 transition-all ease-in-out duration-300 border-yellow-500/40  rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold ">Blogs by Users</h2>
          <p className="text-2xl font-bold mt-2">{analytics.blogsByUsers}</p>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-neutral-100/10 shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">📈 Monthly Blog Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickFormatter={(tick) => {
                const [year, month] = tick.split("-");
                return `${month}/${year}`;
              }}
            />
            <YAxis />
            <Tooltip
              formatter={(value) => [`${value} blogs`, "Created"]}
              labelFormatter={(label) => {
                const [year, month] = label.split("-");
                return `${month}/${year}`;
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Latest Blogs */}
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Latest Blogs</h2>
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Author</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {analytics.latestBlogs.map((blog) => (
              <tr key={blog.id} className="border-t">
                <td className="p-2">{blog.title}</td>
                <td className="p-2">{blog.User?.userName}</td>
                <td className="p-2">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Authors */}
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Top Authors</h2>
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Author</th>
              <th className="p-2 text-left">Blog Count</th>
            </tr>
          </thead>
          <tbody>
            {analytics.topAuthors.map((author) => (
              <tr key={author.User.id} className="border-t">
                <td className="p-2">{author.User.userName}</td>
                <td className="p-2">{author.blogCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
