import React, { useState, useEffect } from "react";
import {
  Laptop,
  Plane,
  PlusCircle,
  Trash2,
  Sparkles,
  Calendar,
  Target,
  ShieldCheck,
  Car,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import PopUpDeleteGoal from "../../components/PopUpDeleteGoal";
import api from "../../api/axios";

// Helper Format Rupiah
const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value || 0);
};

// Map Icon dari String Database ke Komponen Lucide
const renderIcon = (iconName) => {
  const icons = {
    Laptop: <Laptop size={18} className="text-gray-500" />,
    Plane: <Plane size={18} className="text-gray-500" />,
    Target: <Target size={18} className="text-gray-500" />,
    ShieldCheck: <ShieldCheck size={18} className="text-gray-500" />,
    Car: <Car size={18} className="text-gray-500" />,
    Home: <Home size={18} className="text-gray-500" />,
  };
  return icons[iconName] || <Target size={18} className="text-gray-500" />;
};

const Smartplanning = () => {
  const navigate = useNavigate();
  
  // 1. STATE UNTUK DATA API
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State Modal Delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null); // Menyimpan objek utuh

  // 2. FETCH DATA DARI LARAVEL
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await api.get("/goals");
        // Asumsi data array ada di res.data.data
        setGoals(res.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil data goals:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoals();
  }, []);

  // 3. LOGIKA DELETE
  const handleOpenDelete = (goal) => {
    setGoalToDelete(goal);
    setIsModalOpen(true);
  };

  const executeDelete = async () => {
    if (!goalToDelete) return;
    try {
      await api.delete(`/goals/${goalToDelete.id}`);
      // Hapus dari state lokal tanpa refresh halaman
      setGoals(goals.filter((g) => g.id !== goalToDelete.id));
      setIsModalOpen(false);
    } catch (err) {
      alert("Gagal menghapus goal. Silakan coba lagi.");
    }
  };

  // 4. KALKULASI OTOMATIS (OVERVIEW)
  const totalTarget = goals.reduce((acc, g) => acc + Number(g.target_amount), 0);
  const totalSaved = goals.reduce((acc, g) => acc + Number(g.current_amount), 0);
  const totalRemaining = totalTarget - totalSaved > 0 ? totalTarget - totalSaved : 0;
  
  // Hitung persentase keseluruhan
  const overallProgress = totalTarget > 0 
    ? Math.min(Math.round((totalSaved / totalTarget) * 100), 100) 
    : 0;

  // Placeholder Data untuk Grafik Bulanan (Di masa depan bisa ditarik dari mutasi transaksi)
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
  const BAR_HEIGHTS = [55, 70, 60, 80, 65, 90];

  return (
    <div className="min-h-screen bg-[#121417] flex text-white overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 bg-[#121417] overflow-y-auto relative">
        {/* Bisa panggil LoadingOverlay di sini jika isLoading === true */}
        
        <Header title="Smart Planning" />

        <div className="p-8 grid grid-cols-12 gap-5">
          {/* ── LEFT COLUMN (OVERVIEW) ─────────────────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-7 space-y-5">
            {/* Progress Card Keseluruhan */}
            <div className="bg-white rounded-2xl p-6 text-[#001D3D] flex items-center gap-6 shadow-sm">
              {/* Donut Chart SVG */}
              <div className="relative shrink-0 w-[110px] h-[110px]">
                <svg viewBox="0 0 110 110" className="w-full h-full -rotate-90">
                  <circle cx="55" cy="55" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                  <circle
                    cx="55" cy="55" r="45" fill="none" stroke="#067A55" strokeWidth="10"
                    // Rumus: Keliling = 2 * PI * r (approx 282.7)
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 - (282.7 * (overallProgress / 100))}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-[#001D3D]">{overallProgress}%</span>
                  <span className="text-[9px] font-semibold text-gray-400 tracking-wider uppercase">
                    Total Progress
                  </span>
                </div>
              </div>

              {/* Teks Kalkulasi Dinamis */}
              <div className="flex-1">
                <h2 className="font-black text-xl text-[#001D3D] mb-1">
                  On track for 2024
                </h2>
                <p className="text-gray-500 text-sm leading-snug mb-4">
                  You've reached {formatRupiah(totalSaved)} of your total {formatRupiah(totalTarget)} aggregate goal target. Keep saving!
                </p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#001D3D]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#067A55] inline-block" />
                    Saved: {formatRupiah(totalSaved)}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-200 inline-block" />
                    Remaining: {formatRupiah(totalRemaining)}
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Contributions Card */}
            <div className="bg-white rounded-2xl p-6 text-[#001D3D] shadow-sm">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="font-black text-base text-[#001D3D]">Monthly Velocity</h3>
                  <p className="text-gray-400 text-xs">Based on active plans</p>
                </div>
                <span className="text-[#067A55] font-black text-sm">
                  {/* Contoh menghitung total tabungan yang harus disisihkan per bulan dari semua goal */}
                  Avg. {formatRupiah(goals.reduce((a, g) => a + Number(g.amount_per_period), 0))} /bulan
                </span>
              </div>

              {/* Bar Chart Sederhana */}
              <div className="mt-6 flex items-end gap-3 h-36">
                {MONTHS.map((month, i) => (
                  <div key={month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center h-28">
                      <div
                        className="w-full rounded-t-lg bg-[#E0F2EC]"
                        style={{ height: `${BAR_HEIGHTS[i]}%` }}
                      >
                        {i === MONTHS.length - 1 && <div className="w-full h-full rounded-t-lg bg-[#067A55]" />}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-400 tracking-widest">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (GOALS LIST) ────────────────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-black tracking-tight uppercase text-white">
                Active Goals ({goals.length})
              </h3>
              <button className="text-[#067A55] text-xs font-semibold hover:underline">
                View All
              </button>
            </div>

            {/* Render Data dari Backend */}
            {isLoading ? (
              <div className="animate-pulse flex space-x-4 p-5 bg-white rounded-2xl">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ) : goals.length === 0 ? (
              <div className="bg-white/5 border border-gray-800 rounded-2xl p-6 text-center text-gray-400 text-sm">
                Belum ada target impian. Yuk, buat sekarang!
              </div>
            ) : (
              goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onDelete={() => handleOpenDelete(goal)}
                />
              ))
            )}

            {/* Tombol Add New Goal */}
            <button 
              onClick={() => navigate('/smart-planning/add-goal')}
              className="w-full bg-[#067A55] hover:bg-[#055f42] transition-colors py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest mt-1"
            >
              <PlusCircle size={15} /> Add New Goal
            </button>
          </div>
        </div>

        {/* Delete Modal */}
        <PopUpDeleteGoal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={executeDelete}
          goalName={goalToDelete?.goal_name} // Ambil nama dari state object
        />
      </main>
    </div>
  );
};

// ── GOAL CARD COMPONENT ────────────────────────────────────────────────────────────────
const GoalCard = ({ goal, onDelete }) => {
  // Mapping properti dari Model Laravel ke UI React
  const title = goal.goal_name;
  const saved = Number(goal.current_amount);
  const target = Number(goal.target_amount);
  const progress = goal.progress_percentage; // Hasil hitungan Accessor Backend
  const humanTime = goal.time_remaining_human; // "5 Months Left" dari Backend
  const amountPerPeriod = goal.amount_per_period;
  
  // Tentukan warna badge status secara dinamis
  const statusColor = progress >= 100 ? "bg-blue-500" : progress >= 50 ? "bg-[#067A55]" : "bg-orange-500";
  const statusText = progress >= 100 ? "Achieved" : progress >= 50 ? "On Track" : "Steady";

  return (
    <div className="bg-white rounded-2xl p-5 text-[#001D3D] shadow-sm flex flex-col gap-3 group">
      {/* Baris 1: Icon + Status */}
      <div className="flex items-center justify-between">
        <div className="p-2 border border-gray-100 rounded-lg bg-gray-50 text-[#067A55]">
          {renderIcon(goal.icon)}
        </div>
        <span className={`text-[10px] font-bold text-white px-3 py-1 rounded-full ${statusColor}`}>
          {statusText}
        </span>
      </div>

      {/* Baris 2: Prediksi dari Backend */}
      <div className="flex items-center gap-1.5 bg-[#F0FBF6] border border-[#C2EDD9] text-[#067A55] text-[10px] font-semibold px-2.5 py-1.5 rounded-lg w-fit">
        <Sparkles size={11} />
        PREDIKSI: {humanTime.toUpperCase()}
      </div>

      {/* Baris 3: Judul */}
      <div>
        <h4 className="font-black text-base text-[#001D3D]">{title}</h4>
        <p className="text-gray-400 text-xs mt-0.5 leading-snug">
          Mencapai target dengan menabung {formatRupiah(amountPerPeriod)} per periode ({goal.filling_plan.toLowerCase()}).
        </p>
      </div>

      {/* Baris 4: Nominal & Progress */}
      <div className="flex items-end justify-between mt-2">
        <p className="text-[20px] font-black text-[#001D3D] leading-none">
          {formatRupiah(saved)}
          <span className="text-gray-400 text-xs font-semibold block sm:inline sm:ml-1">
            / {formatRupiah(target)}
          </span>
        </p>
        <span className="text-[#067A55] font-black text-sm">{progress}%</span>
      </div>

      {/* Baris 5: Progress Bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 bg-[#067A55]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Footer: Date & Delete */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <Calendar size={12} />
          <span>Mulai: {new Date(goal.start_date).toLocaleDateString("id-ID", { month:"short", year:"numeric"})}</span>
        </div>
        <button
          onClick={onDelete}
          className="text-gray-200 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
          title="Hapus Target"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default Smartplanning;