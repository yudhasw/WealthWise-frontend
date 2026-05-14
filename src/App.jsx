import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import TransactionsPage from "./pages/transactions/TransactionPage";
import AddTransactionsPage from "./pages/transactions/AddTransactionPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AccountPage from "./pages/account/AccountPage";
import AddAccountPage from "./pages/account/AddAccountPage";
// 1. IMPORT HALAMAN EDIT DI SINI
import EditAccountPage from "./pages/account/EditAccountPage"; 
import NotificationPage from "./pages/notification/NotificationPage";
import LandingPage from "./pages/landingpage/LandingPage";
import AddNewGoalPage from "./pages/smartplanning/AddNewGoalPage";

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
        
        {/* ROUTES UNTUK ACCOUNT */}
        <Route path="/accounts" element={<AccountPage />} />
        <Route path="/accounts/add" element={<AddAccountPage />} />
        {/* 2. TAMBAHKAN ROUTE EDIT DENGAN PARAMETER :id */}
        <Route path="/accounts/edit/:id" element={<EditAccountPage />} />
        
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/landingpage" element={<LandingPage/>} />
        <Route path="newgoal" element={<AddNewGoalPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;