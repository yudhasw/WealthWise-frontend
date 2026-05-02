import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
        <p className="text-gray-400 mt-1">
          Selamat datang di WealthWise! Pantau kesehatan finansial Anda di sini.
        </p>
      </header>

      {/* Tempat untuk widget atau grafik nantinya */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium">Total Saldo</h3>
          <p className="text-3xl font-bold text-white mt-2">Rp 0</p>
        </div>
      </div>
    </MainLayout>
  );
}
