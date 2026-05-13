import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import api from "../../api/axios";

export default function AddTransaction() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    description: "",
    transaction_date: "",
    type: "EXPENSE",
    amount: "",
    category_id: "",
    account_id: "",
  });

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [accResponse, catResponse] = await Promise.all([
          api.get("/accounts"),
          api.get("/categories"),
        ]);

        setAccounts(accResponse.data.data || accResponse.data);
        setCategories(catResponse.data.data || catResponse.data);

        // Set default account jika ada
        const accountData = accResponse.data.data || accResponse.data;
        if (accountData && accountData.length > 0) {
          setForm((prev) => ({ ...prev, account_id: accountData[0].id }));
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchInitialData();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const newForm = { ...prev, [name]: value };

      if (name === "type") {
        newForm.category_id = "";
      }
      return newForm;
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    if (!isFormValid(form)) {
      alert("Harap isi semua data yang wajib!");
      setIsLoading(false);
      return;
    }

    try {
      const cleanAmount = form.amount.replace(/\D/g, "");

      await api.post("/transactions/add", {
        ...form,
        amount: cleanAmount,
      });

      navigate("/transactions");
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan transaksi. Periksa kembali data Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  // VALIDASI
  const isFormValid = (form) => {
    const isDescriptionValid = form.description.trim() !== "";
    const isDateValid = form.transaction_date !== "";
    const isAmountValid =
      form.amount !== "" && Number(form.amount.replace(/\D/g, "")) > 0;
    const isAccountValid = form.account_id !== "";
    const isCategoryValid =
      form.type === "TRANSFER" ? true : form.category_id !== "";

    return (
      isDescriptionValid &&
      isDateValid &&
      isAmountValid &&
      isAccountValid &&
      isCategoryValid
    );
  };

  // FILTER KATEGORI
  const filteredCategories = categories.filter(
    (cat) => cat.category_type === form.type || cat.type === form.type,
  );

  return (
    <MainLayout isLoading={isLoadingData}>
      <div className="max-w-2xl mx-auto">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span
            className="cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => navigate("/transactions")}
          >
            Transactions
          </span>
          <span className="text-gray-700">›</span>
          <span className="text-emerald-400 font-semibold">
            Add Transaction
          </span>
        </div>

        {/* PAGE HEADER */}
        <h1 className="text-3xl font-extrabold text-emerald-400 tracking-tight mb-1.5">
          Add Transaction
        </h1>
        <p className="text-sm text-gray-500 mb-7">
          Adjust the details of your transaction to maintain an accurate ledger.
        </p>

        {/* FORM CARD */}
        <div className="bg-[#2C2F32] border border-[#262b2f] rounded-2xl p-8">
          {/* Transaction Name */}
          <div className="mb-5">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Transaction Name
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ex: Apple Store MacBook Pro"
              className="w-full bg-white border border-[#262b2f] text-black placeholder-gray-600 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          {/* Date & Type */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="transaction_date"
                  value={form.transaction_date}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#262b2f] text-black px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                Type
              </label>
              <div className="relative">
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full appearance-none bg-white border border-[#262b2f] text-black px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                >
                  <option value="EXPENSE">Expense</option>
                  <option value="INCOME">Income</option>
                  <option value="TRANSFER">Transfer</option>
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Amount & Category */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 pointer-events-none">
                  IDR
                </span>
                <input
                  type="text"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="24.999.000"
                  className="w-full bg-white border border-[#262b2f] text-black placeholder-gray-600 pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <p className="text-xs text-gray-600 mt-1.5">
                Enter amount without currency symbols.
              </p>
            </div>

            {/* 4. TAMPILKAN KATEGORI HANYA JIKA BUKAN TRANSFER */}
            {form.type !== "TRANSFER" ? (
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    className="w-full appearance-none bg-white border border-[#262b2f] text-black px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                  >
                    <option value="">
                      -- Select {form.type.toLowerCase()} category --
                    </option>
                    {filteredCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            ) : (
              // Tampilan placeholder untuk TRANSFER
              <div className="opacity-50">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Category
                </label>
                <div className="w-full bg-gray-200 border border-[#262b2f] text-gray-500 px-4 py-3.5 rounded-xl text-sm flex items-center cursor-not-allowed">
                  No category for transfer
                </div>
              </div>
            )}
          </div>

          {/* Account Toggle Dinamis */}
          <div className="mb-6">
            <label className="block text-[10px] font-bold text-[#C4C6D0] uppercase tracking-widest mb-2">
              Account / Wallet
            </label>

            {isLoadingData ? (
              <div className="text-gray-500 text-xs animate-pulse">
                Loading accounts...
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2.5">
                {accounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => setForm({ ...form, account_id: acc.id })}
                    className={`py-3.5 rounded-xl text-sm font-bold border transition-all ${
                      form.account_id === acc.id
                        ? "bg-[#047857] text-white border-[#047857]"
                        : "bg-[#F2F4F6] border-[#262b2f] text-black hover:border-emerald-500/30"
                    }`}
                  >
                    {acc.account_name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#1e2124] mb-6" />

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate("/transactions")}
              className="text-gray-400 hover:text-white text-sm font-semibold px-5 py-3.5 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid(form)}
              className="bg-[#047857] hover:bg-[#047857] disabled:opacity-60 text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Transaction"
              )}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
