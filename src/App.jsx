import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import TransactionsPage from "./pages/transactions/TransactionPage";
import AddTransactionsPage from "./pages/transactions/AddTransactionPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SmartPlanning from "./pages/smartplanning/Smartplanning";
import AddNewGoalPage from "./pages/smartplanning/AddNewGoalPage";
import EditGoalPage from "./pages/smartplanning/EditGoalPage";
import ViewAllGoals from "./pages/smartplanning/ViewAllGoals";

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
        <Route path="/smart-planning" element={<SmartPlanning />} />
        <Route path="/smart-planning/add-goal" element={<AddNewGoalPage />} />
        <Route path="/smart-planning/edit/:id"element={<EditGoalPage />}/>
        <Route path="/smart-planning/active-goals"element={<ViewAllGoals />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
