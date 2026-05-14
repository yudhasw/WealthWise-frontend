import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import TransactionsPage from "./pages/transactions/TransactionPage";
import AddTransactionsPage from "./pages/transactions/AddTransactionPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AddCategoryPage from "./pages/categories/AddCategoryPage";
import EditCategoryPage from "./pages/categories/EditCategoryPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import SmartPlanning from "./pages/smarplanning/Smartplanning";
import AddNewGoalPage from "./pages/smarplanning/AddNewGoalPage";
import FinancialHealth from "./pages/financial-health/FinancialHealthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/transactions/add" element={<AddTransactionsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/categories/add" element={<AddCategoryPage />} />
        <Route path="/categories/edit/:id" element={<EditCategoryPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/smart-planning" element={<SmartPlanning />} />
        <Route path="/smart-planning/add-goal" element={<AddNewGoalPage />} />
        <Route path="/financial-health" element={<FinancialHealth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
