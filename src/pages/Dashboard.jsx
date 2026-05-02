import MainLayout from "../layouts/MainLayout";

// Data dummy untuk tabel transaksi sesuai desain
const transactions = [
  { id: 1, date: "Jan 24, 2026", category: "Retail", desc: "Apple Store - MacBook Pro", account: "MANDIRI", amount: "-Rp2.499.000", type: "expense", color: "text-blue-500 bg-blue-100" },
  { id: 2, date: "Jan 22, 2026", category: "Income", desc: "Acme Corp Salary", account: "Gopay", amount: "+Rp8.450.000", type: "income", color: "text-emerald-600 bg-emerald-100" },
  { id: 3, date: "Des 25, 2025", category: "Dining", desc: "Le Bernardin Dinner", account: "MANDIRI", amount: "-Rp450.000", type: "expense", color: "text-orange-500 bg-orange-100" },
  { id: 4, date: "Nov 29, 2025", category: "Investment", desc: "Vanguard S&P 500 Buy", account: "MANDIRI", amount: "-Rp1.000.000", type: "expense", color: "text-purple-500 bg-purple-100" },
  { id: 5, date: "Nov 25, 2026", category: "Dividend", desc: "AAPL Q3 Dividend", account: "Jago Bank", amount: "+Rp345.500", type: "income", color: "text-emerald-600 bg-emerald-100" },
];

export default function Dashboard() {
  return (
    <MainLayout>
      {/* Header / Top Navigation */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-emerald-500">Overview</h2>
        <div className="flex items-center gap-5">
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="p-2 bg-[#2A2A2A] rounded-full text-gray-400 hover:text-white transition-colors">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-gray-800">
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-300 mt-2">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
             </svg>
          </div>
        </div>
      </header>

      {/* Top Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Net Worth Card (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#065f46] to-[#0f172a] rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-lg border border-emerald-900/30">
          <div className="z-10 w-full mb-6 md:mb-0">
            <p className="text-xs font-bold tracking-widest text-emerald-100/70 mb-2 uppercase">TOTAL NET WORTH</p>
            <h3 className="text-5xl font-extrabold text-white tracking-tight mb-3">Rp2.450.890</h3>
            <span className="inline-block bg-emerald-800/60 text-emerald-100 text-xs px-2.5 py-1 rounded-md font-medium mb-8">MTD</span>
            
            <div className="flex flex-wrap gap-8 border-b border-emerald-800/50 pb-6 mb-6">
              <div>
                <p className="text-xs text-emerald-200/60 mb-1">Monthly Income</p>
                <p className="text-lg font-bold text-white">Rp4.050.000</p>
              </div>
              <div>
                <p className="text-xs text-emerald-200/60 mb-1">Monthly Expenses</p>
                <p className="text-lg font-bold text-white">Rp1.500.000</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-emerald-200/60 mb-1">Liabilities</p>
              <p className="text-lg font-bold text-red-500">-Rp150.000</p>
            </div>
          </div>
          {/* Circular Stats Placeholder */}
          <div className="z-10 md:mr-4 shrink-0">
            <div className="w-56 h-56 bg-[#e2e2e2] rounded-full flex items-center justify-center shadow-inner">
              <span className="text-gray-900 font-bold text-lg">Stats</span>
            </div>
          </div>
        </div>

        {/* Quick Actions (Takes 1 column) */}
        <div className="lg:col-span-1 flex flex-col">
          <h3 className="text-emerald-500 font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-4 h-full">
            {/* Action 1 */}
            <button className="flex-1 bg-[#333538] rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-[#3f4144] transition-all shadow-md">
              <div className="bg-gray-500/20 p-4 rounded-full mb-3 border border-gray-500/30">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8V6a2 2 0 012-2h2M3 16v2a2 2 0 002 2h2m10-14h2a2 2 0 012 2v2m-2 10h-2a2 2 0 01-2-2v-2m-4-6h.01M9 14h.01M15 10h.01M15 14h.01" />
                </svg>
              </div>
              <span className="text-gray-200 font-medium text-sm text-center">Scan<br/>Receipt</span>
            </button>
            {/* Action 2 */}
            <button className="flex-1 bg-[#102A20] border border-emerald-500/20 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-[#15382a] transition-all shadow-md">
              <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-emerald-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-emerald-500 font-medium text-sm">Ask AI Finance Planner</span>
            </button>
          </div>
        </div>

      </div>

      {/* Recent Transactions Table */}
      <div className="bg-[#f8fafc] rounded-3xl p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
          <a href="#" className="text-emerald-600 font-semibold text-sm hover:underline flex items-center gap-1">
            View All <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs tracking-wider font-bold text-gray-500 border-b border-gray-200">
                <th className="py-4 px-2">DATE</th>
                <th className="py-4 px-2">CATEGORY</th>
                <th className="py-4 px-2">DESCRIPTION</th>
                <th className="py-4 px-2">ACCOUNT</th>
                <th className="py-4 px-2 text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="text-sm hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-2 font-medium text-gray-600 whitespace-nowrap">{tx.date}</td>
                  <td className="py-4 px-2 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.color}`}>
                        {/* Simple placeholder icon per category */}
                        {tx.category === 'Retail' && <span className="text-xs">🛒</span>}
                        {tx.category === 'Income' && <span className="text-xs">🏦</span>}
                        {tx.category === 'Dining' && <span className="text-xs">🍴</span>}
                        {tx.category === 'Investment' && <span className="text-xs">📈</span>}
                        {tx.category === 'Dividend' && <span className="text-xs">💵</span>}
                      </div>
                      <span className="font-semibold text-gray-800">{tx.category}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 font-medium text-gray-800 whitespace-nowrap">{tx.desc}</td>
                  <td className="py-4 px-2 text-gray-500 whitespace-nowrap">{tx.account}</td>
                  <td className={`py-4 px-2 text-right font-bold whitespace-nowrap ${tx.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </MainLayout>
  );
}