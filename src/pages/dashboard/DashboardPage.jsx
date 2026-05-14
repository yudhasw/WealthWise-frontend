import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, User } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import Header from "../../components/Header";
import api from "../../api/axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import TransactionTable from "../../components/TransactionTable";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    net_balance: 0,
    total_income: 0,
    total_expense: 0,
    top_category: "Belum ada data",
  });

  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/dashboard");

        // Mengambil objek data utama dari response axios
        const data = response.data.data || response.data;

        // 🔥 PERBAIKAN 1: Mendukung struktur flat maupun nested
        const summaryData = data.summary || data;

        setSummary({
          net_balance: Number(summaryData.net_balance) || 0,
          total_income: Number(summaryData.total_income) || 0,
          total_expense: Number(summaryData.total_expense) || 0,
          top_category: summaryData.top_category || "Belum ada pengeluaran",
        });

        // 🔥 PERBAIKAN 2: Mencari data chart dengan lebih aman
        const chartRaw = summaryData.chart || data.chart;
        if (chartRaw && typeof chartRaw === "object") {
          const formattedChart = Object.keys(chartRaw).map((key) => ({
            name: key,
            value: Number(chartRaw[key]),
          }));
          setChartData(formattedChart);
        }

        // 🔥 PERBAIKAN 3: Fallback nama key untuk transaksi
        setTransactions(data.recent_transactions || data.transactions || []);
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
      <Header
        title="Dashboard"
        rightSection={
          <div className="flex items-center gap-5">
            <Bell
              size={18}
              className="text-gray-400 hover:text-white cursor-pointer transition-colors"
            />

            <Link
              to="/profile"
              className="w-10 h-10 rounded-full bg-[#1F2937] border border-white/10 flex items-center justify-center hover:bg-[#374151] transition"
            >
              <User size={18} className="text-[#F4B183]" />
            </Link>
          </div>
        }
      />

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-6 text-sm font-semibold">
          {error}
        </div>
      )}

      {/* TOP CARDS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Net Worth Card & Grafik */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#065f46] to-[#0f172a] rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-lg border border-emerald-900/30">
          <div className="z-10 w-full mb-6 md:mb-0">
            <p className="text-xs font-bold text-emerald-100/70 mb-2 uppercase tracking-widest">
              TOTAL NET WORTH
            </p>
            <h3 className="text-5xl font-extrabold text-white mb-3 tracking-tight">
              {formatRupiah(summary.net_balance)}
            </h3>
            <span className="inline-block bg-emerald-800/60 border border-emerald-500/20 text-emerald-100 text-xs px-3 py-1 rounded-md font-bold mb-8">
              ALL TIME
            </span>

            <div className="flex flex-wrap gap-8 border-b border-emerald-800/50 pb-6 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-200/60 mb-1">
                  Total Income
                </p>
                <p className="text-lg font-black text-white">
                  {formatRupiah(summary.total_income)}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-200/60 mb-1">
                  Total Expenses
                </p>
                <p className="text-lg font-black text-white">
                  {formatRupiah(summary.total_expense)}
                </p>
              </div>
            </div>

            {/* Top Category */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-200/60 mb-1">
                Top Category Expense
              </p>
              <p className="text-sm font-bold text-orange-400 uppercase tracking-wide">
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
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={6}
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

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      borderRadius: "12px",
                      color: "#fff",
                      padding: "10px 14px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
                    }}
                    itemStyle={{
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                    formatter={(value, name) => [formatRupiah(value), name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              /* Placeholder jika data kosong */
              <div className="w-48 h-48 rounded-full border-2 border-dashed border-emerald-500/20 flex flex-col items-center justify-center bg-emerald-500/5">
                <span className="text-emerald-500/40 text-xs font-bold tracking-widest uppercase">
                  No Data Yet
                </span>
              </div>
            )}

            {/* Legend Sederhana di bawah Chart */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
              {chartData.slice(0, 3).map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-[10px] font-bold text-emerald-100/60 uppercase tracking-tighter">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1 flex flex-col">
          <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-4 px-1">
            Quick Actions
          </h3>
          <div className="flex flex-col gap-4 h-full">
            <button className="flex-1 bg-[#161a1d] border border-[#262b2f] rounded-3xl p-6 flex flex-col items-center justify-center hover:bg-[#1e2124] hover:border-emerald-500/30 transition-all shadow-md group">
              <div className="bg-[#1e2124] group-hover:bg-emerald-500/10 p-4 rounded-full mb-3 border border-[#262b2f] group-hover:border-emerald-500/30 transition-colors">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-gray-400 group-hover:text-emerald-400 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8V6a2 2 0 012-2h2M3 16v2a2 2 0 002 2h2m10-14h2a2 2 0 012 2v2m-2 10h-2a2 2 0 01-2-2v-2m-4-6h.01M9 14h.01M15 10h.01M15 14h.01"
                  />
                </svg>
              </div>
              <span className="text-gray-300 font-bold text-sm text-center group-hover:text-white transition-colors">
                Scan Receipt
              </span>
            </button>

            <Link
              to="/smart-planning"
              className="flex-1 bg-gradient-to-br from-[#0d2718] to-[#161a1d] border border-emerald-500/20 rounded-3xl p-6 flex flex-col items-center justify-center hover:border-emerald-500/50 transition-all shadow-md group"
            >
              <div className="bg-emerald-500 p-3 rounded-full mb-3 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-emerald-400 font-bold text-sm group-hover:text-emerald-300 transition-colors">
                Open Smart Planning
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* RECENT TRANSACTIONS TABLE */}
      {/* isRecent={true} memastikan tombol edit/delete disembunyikan di tabel ini */}
      <TransactionTable
        transactions={transactions?.slice(0, 5) || []}
        isLoading={isLoading}
        error={error}
        isRecent={true}
      />
    </MainLayout>
  );
}
