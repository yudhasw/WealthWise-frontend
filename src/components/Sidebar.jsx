import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // Untuk mendeteksi halaman saat ini
  
  // State untuk mengontrol menu mana yang sedang terbuka (collapse/expand)
  const [openMenus, setOpenMenus] = useState({
    financials: true,
    manage: true,
    analytics: true,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Gagal menghapus token di server", error);
    } finally {
      localStorage.removeItem("wealthwise_token");
      navigate("/login");
    }
  };

  // Fungsi bantuan untuk mengecek apakah path saat ini aktif
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-[#2A2C30] border-r border-gray-800 flex flex-col h-screen py-6 px-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* Header / Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-white text-black font-bold flex items-center justify-center rounded-full text-xs">
          Logo
        </div>
        <div>
          <h1 className="text-xl font-bold text-emerald-500 tracking-tight leading-tight">
            WealthWise
          </h1>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">
            Financial Atelier
          </p>
        </div>
      </div>

      {/* Tombol Add Transaction */}
      <button className="w-full bg-[#0E7958] hover:bg-[#0b6348] text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-6 transition-colors">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Transaction
      </button>

      {/* Navigasi Utama */}
      <nav className="flex-1 space-y-1">
        
        {/* Item: Dashboard (Tanpa Child) */}
        <Link
          to="/dashboard"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            isActive("/dashboard")
              ? "bg-[#F3F4F6] text-[#0E7958]"
              : "text-gray-300 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h2v1H5zM3 13a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h2v1H5zM11 4a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm2 2V5h2v1h-2zM11 13a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3zm2 2v-1h2v1h-2z" clipRule="evenodd" />
          </svg>
          Dashboard
        </Link>

        {/* --- Section: Financials --- */}
        <div className="pt-2">
          <button
            onClick={() => toggleMenu("financials")}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white transition-colors"
          >
            <svg
              fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className={`w-4 h-4 transition-transform duration-200 ${openMenus.financials ? "rotate-0" : "-rotate-90"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <span className="font-medium">Financials</span>
          </button>
          
          {/* Child Items: Financials */}
          {openMenus.financials && (
            <div className="ml-11 mt-1 space-y-1">
              <Link to="/transactions" className={`block px-3 py-2 text-sm rounded-lg transition-colors ${isActive("/transactions") ? "text-emerald-500 font-medium" : "text-gray-400 hover:text-white"}`}>
                <span className="flex items-center gap-3"><span className="text-lg">🧾</span> Transactions</span>
              </Link>
              <Link to="/smart-planning" className={`block px-3 py-2 text-sm rounded-lg transition-colors ${isActive("/smart-planning") ? "text-emerald-500 font-medium" : "text-gray-400 hover:text-white"}`}>
                <span className="flex items-center gap-3"><span className="text-lg">⚡</span> Smart Planning</span>
              </Link>
            </div>
          )}
        </div>

        {/* --- Section: Manage --- */}
        <div className="pt-2">
          <button
            onClick={() => toggleMenu("manage")}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white transition-colors"
          >
            <svg
              fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className={`w-4 h-4 transition-transform duration-200 ${openMenus.manage ? "rotate-0" : "-rotate-90"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <span className="font-medium">Manage</span>
          </button>
          
          {/* Child Items: Manage */}
          {openMenus.manage && (
            <div className="ml-11 mt-1 space-y-1">
              <Link to="/accounts" className={`block px-3 py-2 text-sm rounded-lg transition-colors ${isActive("/accounts") ? "text-emerald-500 font-medium" : "text-gray-400 hover:text-white"}`}>
                <span className="flex items-center gap-3"><span className="text-lg">🏛️</span> Accounts</span>
              </Link>
              <Link to="/budgets" className={`block px-3 py-2 text-sm rounded-lg transition-colors ${isActive("/budgets") ? "text-emerald-500 font-medium" : "text-gray-400 hover:text-white"}`}>
                <span className="flex items-center gap-3"><span className="text-lg">💵</span> Budgets</span>
              </Link>
              <Link to="/categories" className={`block px-3 py-2 text-sm rounded-lg transition-colors ${isActive("/categories") ? "text-emerald-500 font-medium" : "text-gray-400 hover:text-white"}`}>
                <span className="flex items-center gap-3"><span className="text-lg">🔠</span> Categories</span>
              </Link>
            </div>
          )}
        </div>

        {/* --- Section: Analytics --- */}
        <div className="pt-2">
          <button
            onClick={() => toggleMenu("analytics")}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white transition-colors"
          >
            <svg
              fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className={`w-4 h-4 transition-transform duration-200 ${openMenus.analytics ? "rotate-0" : "-rotate-90"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <span className="font-medium">Analytics</span>
          </button>
          
          {/* Child Items: Analytics */}
          {openMenus.analytics && (
            <div className="ml-11 mt-1 space-y-1">
              <Link to="/stats" className={`block px-3 py-2 text-sm rounded-lg transition-colors ${isActive("/stats") ? "text-emerald-500 font-medium" : "text-gray-400 hover:text-white"}`}>
                <span className="flex items-center gap-3"><span className="text-lg">📈</span> Stats</span>
              </Link>
              <Link to="/financial-health" className={`block px-3 py-2 text-sm rounded-lg transition-colors ${isActive("/financial-health") ? "text-emerald-500 font-medium" : "text-gray-400 hover:text-white"}`}>
                <span className="flex items-center gap-3"><span className="text-lg">📊</span> Financial Health</span>
              </Link>
            </div>
          )}
        </div>

      </nav>

      {/* Bagian Bawah: Support & Logout */}
      <div className="pt-6 mt-6 border-t border-gray-700 space-y-1">
        <Link
          to="/support"
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white transition-colors rounded-xl hover:bg-gray-800/50"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          <span className="font-medium text-sm">Support</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/10"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>

    </aside>
  );
}