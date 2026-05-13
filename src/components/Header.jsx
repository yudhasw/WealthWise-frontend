import React from "react";
import { Link } from "react-router-dom"; // Tambahkan import Link
import { Bell, Search, User } from "lucide-react";

export default function Header({ title = "Budgeting", rightSection }) {
  return (
    <header className="h-20 bg-[#161A1F] border-b border-white/5 flex items-center justify-between px-8">
      
      {/* TITLE */}
      <h1 className="text-[#0FA36B] text-3xl font-bold">
        {title}
      </h1>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-5">
        
        {rightSection ? (
          rightSection
        ) : (
          <>
            {/* NOTIFICATION */}
            <button className="text-gray-400 hover:text-white transition">
              <Bell size={18} />
            </button>

            {/* SEARCH */}
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-white/20 transition">
              <Search size={18} />
            </button>

            {/* DIVIDER */}
            <div className="h-8 w-px bg-white/10"></div>

            {/* PROFILE - DIUBAH MENJADI LINK */}
            <Link 
              to="/profile" 
              className="w-10 h-10 rounded-full bg-[#1F2937] border border-white/10 flex items-center justify-center hover:bg-[#374151] transition cursor-pointer"
            >
              <User size={18} className="text-[#F4B183]" />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}