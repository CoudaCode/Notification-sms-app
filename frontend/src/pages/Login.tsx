// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { LoginSchema } from "../api/validateSchema";
// import Button from "../components/Button";
// import Input from "../components/Input";
// import Loader from "../components/Loader";
// import { useAuth } from "../context/AuthProvider";
// import { LoginFormInputs } from "../types/user";

// const Login: React.FC = () => {
//   const styleInpt =
//     "w-full rounded-lg border-gray-700 text-gray-100 p-4 pe-12 text-sm shadow-sm bg-gray-500";

//   const buttonStyle =
//     "inline-block rounded-lg bg-gray-700 hover:bg-gray-600 px-5 py-3 text-sm font-medium text-white";
//   const router = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormInputs>({
//     resolver: zodResolver(LoginSchema),
//   });
//   const { Login, isLoading } = useAuth();

//   const onSubmit: (data: LoginFormInputs) => Promise<void> = async (
//     data: LoginFormInputs
//   ) => {
//     try {
//       await Login(data);
//       toast.success("Connexion réussie");
//       router("/product");
//     } catch (e) {
//       toast.error("Email ou mot de passe incorrect");
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <section className="relative flex flex-wrap lg:h-screen lg:items-center">
//           <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
//             <div className="max-w-lg mx-auto text-center">
//               <h1 className="text-2xl font-bold text-gray-400 sm:text-3xl">
//                 Connectez-vous à votre compte
//               </h1>
//               <p className="mt-4 text-gray-100">
//                 Entrez vos informations de connexion pour accéder à votre
//                 compte.
//               </p>
//             </div>

//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               action="#"
//               className="max-w-md mx-auto mt-8 mb-0 space-y-4"
//             >
//               <Input
//                 register={register}
//                 className={styleInpt}
//                 label="PhoneNumber"
//                 type="text"
//                 name="phoneNumber"
//                 id="phoneNumber"
//                 placeholder="Enter PhoneNumber"
//                 options={{ valueAsNumber: false }}
//                 error={errors.phoneNumber?.message as string}
//               />
//               <Input
//                 register={register}
//                 className={styleInpt}
//                 label="Password"
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="Enter mot de passe"
//                 error={errors.password?.message as string}
//               />
//               <div className="flex items-center justify-between">
//                 <p className="text-sm text-gray-400 hover:text-gray-700">
//                   Pas encore de compte ?
//                   <Link to="/signup" className="underline">
//                     S'inscrire
//                   </Link>
//                 </p>
//                 <Button
//                   type="submit"
//                   className={buttonStyle}
//                   text="Se connecter"
//                 />
//               </div>
//             </form>
//           </div>

//           <div className="relative w-full h-64 sm:h-96 lg:h-full lg:w-1/2">
//             <img
//               alt=""
//               src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
//               className="absolute inset-0 object-cover w-full h-full"
//             />
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default Login;

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoginSchema } from "../api/validateSchema";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { useAuthStore } from "../context/useAuthStore";
import { LoginFormInputs } from "../types/user";

const Login: React.FC = () => {
  const styleInpt =
    "w-full rounded-lg border-gray-700 text-gray-100 p-4 pe-12 text-sm shadow-sm bg-gray-500";

  const buttonStyle =
    "inline-block rounded-lg bg-gray-700 hover:bg-gray-600 px-5 py-3 text-sm font-medium text-white";
  const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const { login, isLoading } = useAuthStore((state) => ({
    login: state.login,
    isLoading: state.isLoading,
  }));

  const onSubmit: (data: LoginFormInputs) => Promise<void> = async (
    data: LoginFormInputs
  ) => {
    try {
      await login(data);
      toast.success("Connexion réussie");
      router("/product");
    } catch (e) {
      toast.error("Email ou mot de passe incorrect");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="relative flex flex-wrap lg:h-screen lg:items-center">
          <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
            <div className="max-w-lg mx-auto text-center">
              <h1 className="text-2xl font-bold text-gray-400 sm:text-3xl">
                Connectez-vous à votre compte
              </h1>
              <p className="mt-4 text-gray-100">
                Entrez vos informations de connexion pour accéder à votre
                compte.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              action="#"
              className="max-w-md mx-auto mt-8 mb-0 space-y-4"
            >
              <Input
                register={register}
                className={styleInpt}
                label="PhoneNumber"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter PhoneNumber"
                options={{ valueAsNumber: false }}
                error={errors.phoneNumber?.message as string}
              />
              <Input
                register={register}
                className={styleInpt}
                label="Password"
                type="password"
                name="password"
                id="password"
                placeholder="Enter mot de passe"
                error={errors.password?.message as string}
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400 hover:text-gray-700">
                  Pas encore de compte ?
                  <Link to="/signup" className="underline">
                    S'inscrire
                  </Link>
                </p>
                <Button
                  type="submit"
                  className={buttonStyle}
                  text="Se connecter"
                />
              </div>
            </form>
          </div>

          <div className="relative w-full h-64 sm:h-96 lg:h-full lg:w-1/2">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
