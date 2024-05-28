import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Signup from "./pages/Sign-up";
import Transaction from "./pages/Transaction";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
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
      </QueryClientProvider>
    </>
  );
};

export default App;
