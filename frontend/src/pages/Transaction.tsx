import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Transaction() {
  const { user, isAuthenticated } = useAuth();
  const router = useNavigate();

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 5000,
      quantity: 1,
      image: "https://i.imgur.com/1GrakTl.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 3000,
      quantity: 1,
      image: "https://i.imgur.com/ba3tvGm.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: 7000,
      quantity: 1,
      image: "https://i.imgur.com/pHQ3xT3.jpg",
    },
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      router("/login");
    }
  }, [isAuthenticated, router]);

  const total: number = products.reduce(
    (acc: number, product: { id: number; price: number; quantity: number }) =>
      acc + product.price * product.quantity,
    0
  );

  const incrementQuantity: (id: number) => void = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrementQuantity: (id: number) => void = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const removeProduct: (id: number) => void = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

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
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center p-1 border-t border-b"
              >
                <div className="w-1/6">
                  <img
                    className="object-cover w-full h-full"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="w-1/3 px-1">
                  <div className="text-gray-500">{product.name}</div>
                  <div className="font-bold">{product.name}</div>
                </div>
                <div className="flex items-center w-1/3">
                  <button
                    onClick={() => decrementQuantity(product.id)}
                    className="px-1 text-gray-500"
                  >
                    -
                  </button>
                  <span className="px-1 text-center border">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => incrementQuantity(product.id)}
                    className="px-1 text-gray-500"
                  >
                    +
                  </button>
                </div>
                <div className="w-1/6 text-right">
                  <span>
                    {(product.price * product.quantity).toFixed(2)} FCFA
                  </span>
                  <button
                    onClick={() => removeProduct(product.id)}
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

      <button className="w-24 py-2 mt-4 ml-5 text-white bg-gray-500 rounded-lg w-1/">
        <Link to={"/product"}>Retour</Link>
      </button>
    </div>
  );
}
