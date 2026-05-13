import React, { useState } from "react";

const ProfileManager = () => {
  // State untuk mengontrol apakah sedang dalam mode edit atau view
  const [isEditing, setIsEditing] = useState(false);

  // State data profil (berdasarkan data akademik Anda)
  const [profileData, setProfileData] = useState({
    firstName: "YUDHA SETIAWAN",
    lastName: "WICAKSONO",
    nim: "103012300299",
    email: "yudhasetiawan@student.telkomuniversity.ac.id",
    department: "Informatics - Data Science",
    location: "Bandung, Indonesia",
    phone: "0812-XXXX-XXXX",
  });

  return (
    <div className="flex h-screen w-screen bg-[#121417] text-gray-200 overflow-hidden font-sans">
      {/* SIDEBAR - Tetap Konsisten */}
      <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-[#191C1E] flex flex-col justify-between p-6">
        <div>
          <div className="mb-10 px-2">
            <h1 className="text-[#10B981] text-xl font-bold tracking-tight">
              WealthWise
            </h1>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold">
              Wealth Navigator
            </p>
          </div>
          <nav className="space-y-2">
            <div className="flex items-center gap-3 p-3 text-gray-400 hover:bg-white/5 rounded-lg cursor-pointer">
              <div className="w-4 h-4 border border-gray-500 rounded-sm"></div>
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/10 text-white rounded-lg border-l-4 border-[#10B981] shadow-lg">
              <div className="w-4 h-4 border border-[#10B981] rounded-sm bg-[#10B981]/20"></div>
              <span className="text-sm font-bold">Profile</span>
            </div>
          </nav>
        </div>
        <button className="w-full bg-[#10B981] text-[#00422B] font-bold py-3 rounded-xl hover:bg-[#059669] transition-all">
          + Add Transaction
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col bg-gradient-to-br from-[#121417] via-[#121417] to-[#006C47]/15 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex-shrink-0 bg-[#191C1E] border-b border-white/10 flex items-center justify-between px-8">
          <h2 className="text-[#10B981] text-lg font-bold italic">
            {isEditing ? "Edit Profile" : "Profile Details"}
          </h2>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="cursor-pointer hover:text-white transition-colors">
              🔔
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              ⚙️
            </span>
          </div>
        </header>

        {/* Content Centering Wrapper */}
        <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
          {isEditing ? (
            /* COMPONENT: EDIT PROFILE */
            <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl p-10 text-gray-800 animate-in fade-in zoom-in duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-black text-[#0B1C30] uppercase">
                  Edit Account Profile
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  NIM: {profileData.nim}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                <InputGroup label="First Name" value={profileData.firstName} />
                <InputGroup label="Last Name" value={profileData.lastName} />
                <div className="col-span-2">
                  <InputGroup label="Email Address" value={profileData.email} />
                </div>
                <InputGroup label="Department" value={profileData.department} />
                <InputGroup label="Location" value={profileData.location} />
              </div>

              <div className="pt-10 flex justify-end gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-3 rounded-xl text-[10px] font-bold text-gray-400 hover:bg-gray-50 transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-10 py-3 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-[10px] font-black shadow-lg shadow-emerald-700/20 transition-all active:scale-95 uppercase tracking-widest"
                >
                  Save Profile
                </button>
              </div>
            </div>
          ) : (
            /* COMPONENT: VIEW PROFILE */
            <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl p-10 relative text-gray-800 animate-in fade-in zoom-in duration-300">
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-8 right-10 bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2 rounded-full text-xs font-extrabold transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                ✎ Edit Profile
              </button>

              <div className="mb-10">
                <h3 className="text-3xl font-black text-[#0B1C30] uppercase tracking-tight">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-widest">
                  NIM: {profileData.nim}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 border-y border-gray-100 py-6 mb-10">
                <StatItem value="11" label="Discussions" />
                <StatItem value="9" label="Certificates" />
                <StatItem
                  value="Wealth"
                  label="Member Type"
                  color="text-[#10B981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <DisplayGroup label="Email Address" value={profileData.email} />
                <DisplayGroup label="Phone Number" value={profileData.phone} />
                <DisplayGroup
                  label="Department"
                  value={profileData.department}
                />
                <DisplayGroup label="Location" value={profileData.location} />
              </div>

              <div className="mt-12 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <p>Last login: 12 May 2026</p>
                <div className="flex gap-6">
                  <span className="text-red-500 cursor-pointer hover:underline">
                    Log Out
                  </span>
                  <span className="cursor-pointer hover:text-gray-600">
                    Support
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Reusable Components
const InputGroup = ({ label, value }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-wider">
      {label}
    </label>
    <input
      type="text"
      defaultValue={value}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#10B981] outline-none font-semibold text-gray-700 transition-all"
    />
  </div>
);

const DisplayGroup = ({ label, value }) => (
  <div>
    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">
      {label}
    </label>
    <p className="text-gray-800 font-semibold break-all">{value}</p>
  </div>
);

const StatItem = ({ value, label, color = "text-gray-900" }) => (
  <div>
    <p className={`text-xl font-black ${color}`}>{value}</p>
    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
      {label}
    </p>
  </div>
);

export default ProfileManager;
