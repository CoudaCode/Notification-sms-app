import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { smstoken } from "../api/url";
import { useAuthStore } from "../context/useAuthStore";

function Payment() {
  const { user, setUser } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const router = useNavigate();
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePaymentConfirmation = async (event) => {
    event.preventDefault();

    const paymentAmount = 10000;

    if (user && (user.balance ?? 0) < paymentAmount) {
      setConfirmationMessage("Solde insuffisant pour effectuer le paiement.");
      setIsModalOpen(true);
      return;
    }

    if (user) {
      try {
        await sendConfirmationSMS(user.phoneNumber);

        const newBalance: number = user?.balance - paymentAmount;
        const updatedUser = { ...user, balance: newBalance };
        setUser(updatedUser);
        setConfirmationMessage(
          "Votre commande a été validée. Un message de confirmation a été envoyé à votre numéro de téléphone."
        );
        setIsModalOpen(true);
      } catch (error) {
        console.error(error);
        setConfirmationMessage(
          "Une erreur s'est produite lors de l'envoi du SMS."
        );
        setIsModalOpen(true);
      }
    }
  };

  const sendConfirmationSMS = async (phoneNumber) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${smstoken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender_id: "INFO SMS",
        recipient: `${phoneNumber}`,
        message:
          "Votre commande a bien été confirmée. Merci pour votre achat! 🛒 Nous vous tiendrons informé de l'avancement de votre livraison. Restez à l'écoute! 📦",
      }),
    };

    try {
      const response = await fetch(
        "https://api.jetfy.net/api/v1/sms/send",
        options
      );
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error(error);
      throw new Error("Une erreur s'est produite lors de l'envoi du SMS.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router("/product");
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

      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <form
          onSubmit={handlePaymentConfirmation}
          className="w-full max-w-sm mx-auto"
        >
          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                htmlFor="phoneNumber"
                className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
              >
                Numéro de téléphone:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                id="phoneNumber"
                type="tel"
                value={user?.phoneNumber || ""}
                readOnly
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-100 border rounded appearance-none focus:outline-none focus:bg-white"
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
              >
                Confirmer le paiement
              </button>
            </div>
          </div>
        </form>
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirmation du paiement
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {confirmationMessage}
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default Payment;
