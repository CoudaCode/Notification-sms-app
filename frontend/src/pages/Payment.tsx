import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

function Payment() {
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handlePaymentConfirmation = () => {
    // Vérification du numéro de téléphone
    if (!isValidPhoneNumber(phoneNumber)) {
      setConfirmationMessage("Veuillez saisir un numéro de téléphone valide.");
      return;
    }

    // Vérification du solde
    // const paymentAmount = /* Montant du paiement */;
    // if (user.balance < paymentAmount) {
    //   setConfirmationMessage("Solde insuffisant pour effectuer le paiement.");
    //   return;
    // }

    // Envoi du SMS de confirmation
    sendConfirmationSMS(phoneNumber);

    // Affichage du message de confirmation
    setConfirmationMessage(
      "Un message de confirmation a été envoyé à votre numéro de téléphone."
    );
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Logique de validation du numéro de téléphone
    // Retourne true si le numéro est valide, false sinon
    return phoneNumber.length === 10; // Exemple simple de validation
  };

  const sendConfirmationSMS = (phoneNumber) => {
    // Logique d'envoi de SMS de confirmation
    // Ici, vous enverrez réellement le SMS à l'utilisateur
    // (cette fonction peut être une requête à votre service d'envoi de SMS ou une API tierce)
    // Par exemple :
    // sendSMSService.sendConfirmationSMS(phoneNumber, "Votre commande a été validée. Merci!");
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
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
        {confirmationMessage && (
          <div className="mt-4 text-gray-800">{confirmationMessage}</div>
        )}
      </div>
    </div>
  );
}

export default Payment;
