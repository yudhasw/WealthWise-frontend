import React from "react";
import {
  Bell,
  Settings,
  ChevronRight,
  User,
  CreditCard,
  Wallet,
  BellRing,
} from "lucide-react";
import Sidebar from "../../layouts/Sidebar";
import Header from "../../components/Header";

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-[#121417] flex text-white overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 bg-gradient-to-br from-[#006B5B] to-[#003C73]">
        <Header
          title="Profile"
          rightSection={
            <div className="flex items-center gap-6">
              <Bell className="text-gray-400 cursor-pointer" size={18} />
              <Settings className="text-gray-400 cursor-pointer" size={18} />

              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="w-11 h-11 rounded-full border-2 border-white/20"
              />
            </div>
          }
        />

        {/* CONTENT */}
        <div className="p-8">
          {/* PROFILE CARD */}
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 bg-[#F5F5F5] rounded-2xl p-6 flex items-center gap-5">
              {/* IMAGE */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-[4px] border-[#14B884] p-1">
                  <img
                    src="https://i.pravatar.cc/150"
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#14B884] border-2 border-white"></div>
              </div>

              {/* INFO */}
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-bold text-[#1B1B1B]">
                    Asep Kopling
                  </h2>

                  <span className="bg-[#14B884] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                    Premium Member
                  </span>
                </div>

                <p className="text-gray-500 mt-2 text-lg">
                  Wealth Management Client since 2021
                </p>

                <div className="flex gap-4 mt-6">
                  <button className="bg-[#0FA36B] hover:bg-[#0d8e5d] text-white px-6 py-3 rounded-xl font-semibold">
                    Edit Profile
                  </button>

                  <button className="border border-gray-300 text-gray-500 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">
                    Share Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-5 mt-5">
            <StatCard
              title="TOTAL BALANCE"
              value={formatRupiah(12459200)}
              subtitle="+2.4% this month"
              valueColor="text-[#0FA36B]"
              progress="75%"
            />

            <StatCard
              title="MONTHLY INCOME"
              value={formatRupiah(1240000)}
              progress="65%"
            />

            <StatCard
              title="MONTHLY EXPENSES"
              value={formatRupiah(421000)}
              valueColor="text-[#E53935]"
              progress="35%"
            />

            <StatCard
              title="TOTAL SAVINGS"
              value={formatRupiah(4520000)}
              valueColor="text-[#1565FF]"
              subtitle="82% of goal reached"
              progress="82%"
            />
          </div>

          {/* SETTINGS */}
          <div className="grid grid-cols-2 gap-5 mt-8">
            {/* LEFT */}
            <div>
              <h3 className="text-3xl font-bold mb-4 text-[#111827]">
                Account & Banking
              </h3>

              <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
                <SettingItem
                  icon={<User size={18} />}
                  title="Personal Information"
                  subtitle="Manage names, emails, and phone numbers"
                />

                <SettingItem
                  icon={<CreditCard size={18} />}
                  title="Manage Cards"
                  subtitle="View and edit payment methods"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <h3 className="text-3xl font-bold mb-4 text-[#111827]">
                Preferences
              </h3>

              <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
                <SettingItem
                  icon={<Wallet size={18} />}
                  title="Budget Settings"
                  subtitle="Set monthly limits and categories"
                />

                <SettingItem
                  icon={<BellRing size={18} />}
                  title="Notifications"
                  subtitle="Alerts, reports, and marketing emails"
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-16 border-t border-white/20 pt-6 flex items-center justify-between">
            <div className="flex items-center gap-10">
              <button className="text-red-400 font-semibold hover:text-red-300">
                Sign Out
              </button>

              <button className="text-white/80 hover:text-white">
                Help & Support
              </button>
            </div>

            <p className="text-white/50">Version 4.2.0-stable</p>
          </div>
        </div>
      </main>
    </div>
  );
};

/* STAT CARD */
const StatCard = ({
  title,
  value,
  subtitle,
  progress,
  valueColor = "text-[#1B1B1B]",
}) => {
  return (
    <div className="bg-[#F5F5F5] rounded-2xl p-5">
      <p className="text-gray-400 text-xs font-bold uppercase">{title}</p>

      <h2 className={`text-4xl font-bold mt-3 ${valueColor}`}>{value}</h2>

      <div className="w-full h-2 bg-gray-200 rounded-full mt-5 overflow-hidden">
        <div
          className="bg-[#0FA36B] h-full rounded-full"
          style={{ width: progress }}
        ></div>
      </div>

      {subtitle && (
        <p className="text-xs text-gray-500 mt-2 font-semibold">
          {subtitle}
        </p>
      )}
    </div>
  );
};

/* SETTING ITEM */
const SettingItem = ({ icon, title, subtitle }) => {
  return (
    <div className="flex items-center justify-between px-5 py-5 border-t border-gray-200 first:border-t-0 hover:bg-gray-50 transition cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="bg-[#0FA36B]/10 p-3 rounded-full text-[#0FA36B]">
          {icon}
        </div>

        <div>
          <h4 className="text-[#1B1B1B] font-semibold">{title}</h4>

          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>

      <ChevronRight className="text-gray-400" size={18} />
    </div>
  );
};

export default ProfilePage;