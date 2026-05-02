import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Import alat komunikasi kita ke Laravel

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Meminta backend Laravel untuk menghancurkan token di database
      await api.post("/logout");
    } catch (error) {
      console.error("Gagal menghapus token di server", error);
    } finally {
      // 2. Apapun yang terjadi di server, kita wajib menghapus token di browser
      localStorage.removeItem("wealthwise_token");

      // 3. Arahkan pengguna kembali ke gerbang Login
      navigate("/login");
    }
  };

  return (
    <aside className="w-64 bg-[#0A0A0A] border-r border-gray-800 flex flex-col h-screen p-6 justify-between">
      {/* Bagian Atas: Logo & Navigasi */}
      <div>
        <h1 className="text-2xl font-extrabold text-emerald-500 italic">
          WealthWise.
        </h1>
        <nav className="mt-10 space-y-4">
          <a
            href="#"
            className="block text-white font-bold px-4 py-2 bg-gray-800 rounded-xl"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block text-gray-500 hover:text-white px-4 py-2 transition-colors"
          >
            Transactions
          </a>
          <a
            href="#"
            className="block text-gray-500 hover:text-white px-4 py-2 transition-colors"
          >
            Budgets
          </a>
        </nav>
      </div>

      {/* Bagian Bawah: Tombol Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl font-bold transition-colors"
        >
          Keluar (Logout)
        </button>
      </div>
    </aside>
  );
}
