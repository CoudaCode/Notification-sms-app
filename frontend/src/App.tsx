import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Loader from "./components/Loader";
import AuthProvider from "./context/AuthProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Signup from "./pages/Sign-up";
import Transaction from "./pages/Transaction";
// interface Props (not needed here)

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />

        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/paiement" element={<Payment />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/loader" element={<Loader />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
