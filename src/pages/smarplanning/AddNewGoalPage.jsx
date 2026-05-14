import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import api from "../../api/axios"; // Pastikan import axios Anda

const AddNewGoalPage = () => {
  const navigate = useNavigate();

  // State untuk form
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [activePlan, setActivePlan] = useState("DAILY"); // Sesuaikan value dengan ENUM database (huruf besar)
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0] // Default hari ini
  );
  const [icon, setIcon] = useState("Target"); // Default icon

  // State untuk UI Status
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Sesuaikan nilai yang akan dikirim ke database
  const plans = [
    { label: "Daily", value: "DAILY" },
    { label: "Monthly", value: "MONTHLY" },
    { label: "Yearly", value: "YEARLY" },
  ];

  // Pilihan ikon sederhana untuk dipilih
  const iconOptions = ["Target", "Laptop", "Plane", "Car", "Home", "ShieldCheck"];

  // Fungsi format Rupiah
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Hitung amount per period
  let amountPerPeriod = 0;
  if (goalAmount) {
    const amount = parseFloat(goalAmount);
    if (activePlan === "DAILY") amountPerPeriod = amount / 365;
    else if (activePlan === "MONTHLY") amountPerPeriod = amount / 12;
    else amountPerPeriod = amount; // Yearly
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!goalName.trim() || !goalAmount || !startDate) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSaving(true);

    try {
      // Sesuaikan payload dengan struktur Validasi di Controller Laravel
      const payload = {
        goal_name: goalName,
        target_amount: parseFloat(goalAmount),
        filling_plan: activePlan,
        amount_per_period: amountPerPeriod,
        start_date: startDate,
        icon: icon,
        color_theme: "emerald", // Bisa dibikin dinamis nanti
      };

      await api.post("/goals", payload);
      navigate("/smart-planning");
    } catch (err) {
      console.error(err);
      setError("Failed to save goal. Please check your connection or data.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen bg-[#121417] flex overflow-hidden font-sans">
      {/* SIDEBAR SECTION */}
      <div className="relative z-20">
        <Sidebar />
      </div>

      {/* MAIN CONTENT SECTION */}
      <main className="flex-1 relative z-10 flex flex-col min-w-0 overflow-y-auto">
        <Header title="Smart Planning" />

        {/* CONTAINER UNTUK MENENGAHKAN FORM */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* WRAPPER KONTEN */}
          <div className="w-full max-w-2xl pointer-events-auto">
            {/* BREADCRUMB */}
            <nav className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">
              Smart Planning &gt; <span className="text-[#0FA36B]">Add New Goal</span>
            </nav>

            <h2 className="text-[#0FA36B] text-3xl font-black mb-1">
              Add New Goal
            </h2>
            <p className="text-gray-400 text-xs mb-8 font-medium">
              Isi detail di bawah untuk membuat target tabungan baru.
            </p>

            {/* FORM CARD */}
            <form
              onSubmit={handleSubmit}
              className="bg-[#1E2125] rounded-3xl p-10 shadow-2xl border border-white/5"
            >
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* GOAL NAME */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-tighter">
                    Goal Name
                  </label>
                  <input
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    className="bg-[#EBEEF2] text-[#121417] rounded-xl py-3 px-4 font-bold text-sm outline-none focus:ring-2 focus:ring-[#0FA36B]/50 transition-all"
                    placeholder="Contoh: Tabungan Laptop"
                    required
                  />
                </div>

                {/* GOAL AMOUNT */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-tighter">
                    Target Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#121417] font-bold text-sm">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                      className="w-full bg-[#EBEEF2] text-[#121417] rounded-xl py-3 pl-10 pr-4 font-bold text-sm outline-none focus:ring-2 focus:ring-[#0FA36B]/50"
                      placeholder="0"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* FILLING PLAN SELECTION */}
              <div className="mb-8">
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-tighter">
                  Filling Plan (Menabung per)
                </label>
                <div className="flex gap-3 relative z-30">
                  {plans.map((plan) => (
                    <button
                      key={plan.value}
                      type="button"
                      onClick={() => setActivePlan(plan.value)}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 ${
                        activePlan === plan.value
                          ? "bg-[#067A55] text-white shadow-lg shadow-[#067A55]/30 scale-105"
                          : "bg-[#EBEEF2] text-[#121417] hover:bg-white hover:scale-102"
                      }`}
                    >
                      {plan.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CALCULATED AMOUNT (READ ONLY) */}
              <div className="mb-10">
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-tighter">
                  Amount To Save Per Period
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#121417] font-bold text-sm">
                    Rp
                  </span>
                  <input
                    type="text"
                    readOnly
                    value={formatRupiah(amountPerPeriod)}
                    className="w-full bg-[#EBEEF2] text-[#121417] rounded-xl py-4 pl-10 pr-4 font-black text-lg outline-none cursor-not-allowed opacity-90"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *Sistem akan otomatis menghitung kapan target ini tercapai
                  berdasarkan rencana di atas.
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-gray-400 text-xs font-bold hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#EBEEF2] text-[#121417] px-10 py-3.5 rounded-xl font-black text-sm hover:bg-white transition-all shadow-md cursor-pointer active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? "Saving..." : "Save Goal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddNewGoalPage;