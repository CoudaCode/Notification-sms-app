import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../context/productStore";
import { useAuthStore } from "../context/useAuthStore";

export default function Transaction() {
  const { user, isAuthenticated } = useAuthStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }));

  const navigate = useNavigate();
  const { cartItems, incrementCartItem, decrementCartItem, removeFromCart } =
    useProductStore((state) => ({
      cartItems: state.cartItems,
      incrementCartItem: state.incrementCartItem,
      decrementCartItem: state.decrementCartItem,
      removeFromCart: state.removeFromCart,
    }));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const total: number = cartItems.reduce(
    (acc: number, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <div>
      <header className="text-white bg-gray-800 shadow-lg">
        <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-start">
            <div className="text-left">
              <h1 className="text-3xl font-extrabold sm:text-4xl">
                {user?.username}
              </h1>
              <p className="mt-4 text-lg sm:text-xl">
                PN: {user?.phoneNumber} | SOLDE: {user?.balance} FCFA
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col px-4 mt-8 lg:flex-row">
        <div className="lg:w-2/3">
          <h2 className="mb-4 text-xl font-bold text-gray-50">
            Produits selectionnés
          </h2>
          <div className="bg-white rounded-lg shadow-md">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-1 border-t border-b"
              >
                <div className="w-1/6">
                  <img
                    className="object-cover w-full h-full"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="w-1/3 px-1">
                  <div className="text-gray-500">{item.name}</div>
                  <div className="font-bold">{item.name}</div>
                </div>
                <div className="flex items-center w-1/3">
                  <button
                    onClick={() => decrementCartItem(item.id)}
                    className="px-1 text-gray-500"
                  >
                    -
                  </button>
                  <span className="px-1 text-center border">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => incrementCartItem(item.id)}
                    className="px-1 text-gray-500"
                  >
                    +
                  </button>
                </div>
                <div className="w-1/6 text-right">
                  <span>{(item.price * item.quantity).toFixed(2)} FCFA</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-1 text-red-500"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 lg:w-1/3 lg:pl-8 lg:mt-0">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold">Total</h2>
            <p className="text-lg font-semibold">{total.toFixed(2)} FCFA</p>
            <Link to={"/paiement"}>
              <button className="w-full py-2 mt-4 text-white bg-gray-500 rounded-lg">
                Proceder au paiement
              </button>
            </Link>
          </div>
        </div>
      </main>

      <button className="w-24 py-2 mt-4 ml-5 text-white bg-gray-500 rounded-lg">
        <Link to={"/product"}>Retour</Link>
      </button>
    </div>
  );
}
