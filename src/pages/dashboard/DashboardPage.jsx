import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../api/axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import TransactionTable from "../../components/TransactionTable";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    net_balance: 0,
    total_income: 0,
    total_expense: 0,
    top_category: "Belum ada pengeluaran",
  });
  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/dashboard");

        const dashboardData = response.data.data || response.data;

        if (dashboardData.summary) {
          setSummary(dashboardData.summary);

          if (dashboardData.summary.chart) {
            const formattedChart = Object.keys(dashboardData.summary.chart).map(
              (key) => ({
                name: key,
                value: Number(dashboardData.summary.chart[key]),
              }),
            );
            setChartData(formattedChart);
          }
        }

        setTransactions(dashboardData.recent_transactions || []);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
        setError(
          "Gagal memuat data. Pastikan server berjalan dan Anda sudah login.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper untuk Format Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Warna untuk Pie Chart
  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"];

  return (
    <MainLayout isLoading={isLoading}>
      {/* HEADER */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-emerald-500">Overview</h2>
        <div className="flex items-center gap-5">
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <button className="p-2 bg-[#2A2A2A] rounded-full text-gray-400 hover:text-white transition-colors">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-gray-800">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-blue-300 mt-2"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </header>

      {/* TOP CARDS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Net Worth Card & Grafik */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#065f46] to-[#0f172a] rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-lg border border-emerald-900/30">
          <div className="z-10 w-full mb-6 md:mb-0">
            <p className="text-xs font-bold text-emerald-100/70 mb-2 uppercase tracking-widest">
              TOTAL NET WORTH
            </p>
            <h3 className="text-5xl font-extrabold text-white mb-3">
              {formatRupiah(summary.net_balance)}
            </h3>
            <span className="inline-block bg-emerald-800/60 text-emerald-100 text-xs px-2.5 py-1 rounded-md font-medium mb-8">
              ALL TIME
            </span>

            <div className="flex flex-wrap gap-8 border-b border-emerald-800/50 pb-6 mb-6">
              <div>
                <p className="text-xs text-emerald-200/60 mb-1">Total Income</p>
                <p className="text-lg font-bold text-white">
                  {formatRupiah(summary.total_income)}
                </p>
              </div>
              <div>
                <p className="text-xs text-emerald-200/60 mb-1">
                  Total Expenses
                </p>
                <p className="text-lg font-bold text-white">
                  {formatRupiah(summary.total_expense)}
                </p>
              </div>
            </div>

            {/* Top Category */}
            <div>
              <p className="text-xs text-emerald-200/60 mb-1">
                Top Category Expense
              </p>
              <p className="text-sm font-semibold text-orange-300">
                {summary.top_category}
              </p>
            </div>
          </div>

          {/* Grafik Pie Chart Section */}
          <div className="z-10 w-80 h-72 shrink-0 flex flex-col items-center">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={70} // Membuat lubang di tengah (Donut Chart)
                    outerRadius={90}
                    paddingAngle={8} // Jarak antar potongan lebih lebar
                    dataKey="value"
                    stroke="none"
                    cornerRadius={6} // Membuat sudut potongan melengkung (modern)
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-all cursor-pointer outline-none"
                      />
                    ))}
                  </Pie>

                  {/* Tooltip yang lebih elegan */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)", // Warna Slate-900 dengan transparansi
                      border: "1px solid rgba(16, 185, 129, 0.2)", // Border Emerald halus
                      borderRadius: "12px",
                      color: "#fff",
                      padding: "10px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                    itemStyle={{ color: "#fff", fontSize: "12px" }}
                    formatter={(value, name) => [formatRupiah(value), name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              /* Placeholder jika data kosong */
              <div className="w-48 h-48 rounded-full border-2 border-dashed border-emerald-500/20 flex flex-col items-center justify-center bg-emerald-500/5">
                <span className="text-emerald-500/40 text-xs font-medium">
                  No Data Yet
                </span>
              </div>
            )}

            {/* Legend Sederhana di bawah Chart */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
              {chartData.slice(0, 3).map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-[10px] text-emerald-100/60 uppercase tracking-tighter">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1 flex flex-col">
          <h3 className="text-emerald-500 font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-4 h-full">
            <button className="flex-1 bg-[#333538] rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-[#3f4144] transition-all shadow-md">
              <div className="bg-gray-500/20 p-4 rounded-full mb-3 border border-gray-500/30">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8V6a2 2 0 012-2h2M3 16v2a2 2 0 002 2h2m10-14h2a2 2 0 012 2v2m-2 10h-2a2 2 0 01-2-2v-2m-4-6h.01M9 14h.01M15 10h.01M15 14h.01"
                  />
                </svg>
              </div>
              <span className="text-gray-200 font-medium text-sm text-center">
                Scan
                <br />
                Receipt
              </span>
            </button>
            <button className="flex-1 bg-[#102A20] border border-emerald-500/20 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-[#15382a] transition-all shadow-md">
              <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-emerald-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-emerald-500 font-medium text-sm">
                Ask AI Finance Planner
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* RECENT TRANSACTIONS TABLE */}
      <TransactionTable
        transactions={transactions?.slice(0, 5) || []}
        isLoading={isLoading}
        error={error}
        isRecent={true}
      />
    </MainLayout>
  );
}
