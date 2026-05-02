import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-wealthwise-bg text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-10">{children}</main>
    </div>
  );
}
