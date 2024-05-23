import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
export default function Transaction() {
  const { user, isAuthenticated } = useAuth();
  const router = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      router("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <header className="bg-gray-500">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {user?.username}
              </h1>
              <p className="mt-1.5 text-sm text-gray-50">
                Phone Number: {user?.phoneNumber} | Balance:15000 FCFA
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
