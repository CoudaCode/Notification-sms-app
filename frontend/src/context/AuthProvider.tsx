// import Cookies from "js-cookie";
// import { createContext, useContext, useEffect, useState } from "react";
// import { API_URL } from "../api/endpoints";
// import { LoginFormInputs, SignupFormInputs, userType } from "../types/user";

// type Props = {
//   children: React.ReactNode;
// };

// interface AuthContextState {
//   user: userType | null;
//   isAuthenticated: boolean;
//   setIsAuthenticated: (value: boolean) => void;
//   setUser: (user: userType | null) => void;
//   Login: (data: LoginFormInputs) => Promise<void>;
//   signup: (data: SignupFormInputs) => Promise<void>;
//   logout: () => void;
//   isLoading: boolean;
// }

// const initialState: AuthContextState = {
//   user: null,
//   isAuthenticated: Cookies.get("userConnect") !== undefined,
//   setIsAuthenticated: () => {},
//   setUser: () => {},
//   Login: async () => {},
//   signup: async () => {},
//   logout: () => {},
//   isLoading: false,
// };

// export const AuthContext = createContext<AuthContextState>(initialState);
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// const AuthProvider = ({ children }: Props) => {
//   const [user, setUser] = useState<userType | null>(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
//     initialState.isAuthenticated
//   );

//   useEffect(() => {
//     const token = Cookies.get("userConnect");
//     if (token) {
//       checkValidateToken(token);
//     }
//   }, []);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   const checkValidateToken = async (token: string) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${API_URL}/user/check-token`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData); // Mettez à jour les informations de l'utilisateur si le token est valide
//         setIsAuthenticated(true);
//       } else {
//         logout();
//       }
//     } catch (error) {
//       console.error("Erreur lors de la validation du token :", error);
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const Login = async (data: LoginFormInputs) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${API_URL}/user/login`, {
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//       });

//       if (!response.ok) {
//         const errorMessage = await response.json();
//         throw new Error(
//           errorMessage.message || "Email ou mot de passe incorrect."
//         );
//       }

//       const result = await response.json();
//       const userData = { ...result.message, balance: 50000 }; // Inclure le balance ici
//       setUser(userData);
//       setIsAuthenticated(true);
//       Cookies.set("userConnect", result.token);
//       return result;
//     } catch (error) {
//       return Promise.reject(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const signup = async (data: SignupFormInputs) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${API_URL}/user/`, {
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//       });

//       if (!response.ok) {
//         const errorMessage = await response.json();
//         console.log(errorMessage);
//         throw new Error(errorMessage.message || "Ce compte existe déjà.");
//       }

//       const result = await response.json();
//       return result;
//     } catch (e) {
//       return Promise.reject(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     Cookies.remove("userConnect");
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         setIsAuthenticated,
//         user,
//         isAuthenticated,
//         setUser,
//         Login,
//         signup,
//         isLoading,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
