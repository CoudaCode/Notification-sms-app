import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Product } from "./../types/Products";

const Products: React.FC = () => {
  const router = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const incrementQuantity: () => void = () =>
    setQuantity((prev: number) => prev + 1);
  const decrementQuantity: () => void = () =>
    setQuantity((prev: number) => (prev === 1 ? 1 : prev - 1));

  const getProducts: () => Promise<void> = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      setProducts(data.products);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router("/login");
    }
    getProducts();
  }, [isAuthenticated, router]);

  const addToCart: (product: Product) => void = (product) => {
    console.log("to", product.id);
    setCartItems([...cartItems, product]);
  };

  const handleLogout: () => void = () => {
    logout();
    router("/login");
  };
  const cartItemCount: number = cartItems.length;

  return (
    <>
      <header className="bg-gray-500">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome Back, {user?.username}
              </h1>
              <p className="mt-1.5 text-sm text-gray-50"></p>
            </div>
            <div className="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                className="block px-5 py-3 mr-4 text-sm font-medium text-white transition bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring"
                to={"/profile"}
              >
                Profile
              </Link>
              <button
                className="block px-5 py-3 text-sm font-medium text-white transition bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring"
                type="button"
                onClick={() => {
                  handleLogout();
                }}
              >
                Deconnexion
              </button>

              <Link
                to="/transaction"
                className="block px-5 py-3 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
              >
                Panier ({cartItemCount})
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-400 sm:text-3xl">
              Product Collection
            </h2>
          </header>

          <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product: Product) => (
              <article
                className="overflow-hidden transition rounded-lg shadow hover:shadow-lg"
                key={product.id}
              >
                <img
                  alt=""
                  src={product.images[0]}
                  className="object-cover w-full h-56"
                />

                <div className="p-4 bg-white sm:p-6">
                  <time
                    dateTime="2022-10-10"
                    className="block text-xs text-gray-500"
                  >
                    {" "}
                    10th Oct 2022{" "}
                  </time>

                  <a href="#">
                    <h3 className="mt-0.5 text-lg text-gray-900 font-bold">
                      {product.title}
                    </h3>
                  </a>

                  <p className="mt-2 text-gray-500 line-clamp-3 text-sm/relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-500">FCFA</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        className="px-3 py-1 text-gray-700 bg-gray-200 rounded-full"
                        onClick={() => decrementQuantity()}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-700 bg-gray-200 rounded-full">
                        {quantity}
                      </span>
                      <button
                        className="px-3 py-1 text-gray-700 bg-gray-200 rounded-full"
                        onClick={() => incrementQuantity()}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                    onClick={() => addToCart(product)}
                  >
                    <span className="text-sm font-medium"> Ajouter </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Products;
