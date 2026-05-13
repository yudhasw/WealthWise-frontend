import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../api/axios";
import SummaryCard from "../../components/SummaryCard";
import TransactionTable from "../../components/TransactionTable";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);

        const transactionsRes = await api.get("/transactions");

        const transactionsData =
          transactionsRes.data.data || transactionsRes.data;

        setTransactions(transactionsData);
        setFilteredTransactions(transactionsData);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        setError("Gagal memuat riwayat transaksi.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Logika Pencarian
  useEffect(() => {
    const results = transactions.filter(
      (tx) =>
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category?.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredTransactions(results);
  }, [searchTerm, transactions]);

  // Helper Format Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const totalIncome = filteredTransactions
    .filter((tx) => tx.transaction_type === "INCOME")
    .reduce((sum, tx) => sum + (Number(tx.transaction_amount) || 0), 0);

  const totalExpense = filteredTransactions
    .filter((tx) => tx.transaction_type === "EXPENSE")
    .reduce((sum, tx) => sum + (Number(tx.transaction_amount) || 0), 0);

  return (
    <MainLayout isLoading={isLoading}>
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#047857]">Transactions</h2>
          <p className="text-white-400 text-sm mt-1">
            Kelola dan pantau semua catatan keuangan Anda.
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border border-[#1e2124] rounded-2xl p-4 mb-6 flex flex-wrap md:flex-nowrap gap-4 items-end w-full">
        {/* Date From */}
        <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
          <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            Date Range
          </label>
          <input
            type="date"
            className="bg-[#E6E8EA] border border-[#262b2f] text-gray-900 px-3 py-2 rounded-[9px] text-sm w-full focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Date To */}
        <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
          <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            To
          </label>
          <input
            type="date"
            className="bg-[#E6E8EA] border border-[#262b2f] text-gray-900 px-3 py-2 rounded-[9px] text-sm w-full focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Account */}
        <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            Account
          </label>
          <select className="bg-[#E6E8EA] border border-[#262b2f] text-black px-3 py-2 rounded-[9px] text-sm w-full focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer">
            <option>All Accounts</option>
          </select>
        </div>

        {/* Category / Search */}
        <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            Category
          </label>
          <select className="bg-[#E6E8EA] border border-[#262b2f] text-black px-3 py-2 rounded-[9px] text-sm w-full focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer">
            <option>All Categories</option>
          </select>
        </div>

        {/* Apply Button */}
        <div className="flex flex-col gap-1 shrink-0 mt-2 md:mt-0">
          <button className="flex items-center justify-center gap-2 bg-[#001736] text-white border border-emerald-500/30 px-5 py-2 rounded-[9px] text-sm font-bold hover:bg-emerald-500 hover:text-white transition-all w-full md:w-auto h-[38px]">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="white"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Apply
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Kartu Pemasukan */}
        <SummaryCard
          title="Total Income"
          amount={formatRupiah(totalIncome)}
          type="INCOME"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          }
        />

        {/* Kartu Pengeluaran */}
        <SummaryCard
          title="Total Expenses"
          amount={formatRupiah(totalExpense)}
          type="EXPENSE"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 17H5m0 0V9m0 8l8-8 4 4 6-6"
              />
            </svg>
          }
        />
      </div>

      {/* DATA TABLE */}
      <TransactionTable
        transactions={transactions}
        isLoading={isLoading}
        error={error}
      />
    </MainLayout>
  );
}
