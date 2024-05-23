import { Response } from "express";

import { AuthRequest } from "../interface/authRequest";
import { ITransaction, Transaction } from "../models/transaction";
import { IUser, User } from "../models/users";

class TransactionController {
  static async createTransaction(req: AuthRequest, res: Response) {
    try {
      const auth = req.auth as IUser;

      // Vérifier si l'utilisateur existe
      const user = await User.findById(auth._id);
      if (!user) {
        return res
          .status(404)
          .json({ statut: false, message: "Utilisateur non trouvé" });
      }

      // Créer la transaction avec les données de la requête
      const { amount, date, product } = req.body;
      const newTransaction: ITransaction = await Transaction.create({
        amount,
        date,
        product,
        user: auth._id,
        status: "pending",
      });

      if (!newTransaction) {
        return res
          .status(400)
          .json({ statut: false, message: "Erreur lors de la création" });
      }
      return res.status(201).json({ statut: true, message: newTransaction });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }

  static async getTransactions(req: AuthRequest, res: Response) {
    try {
      const auth = req.auth as IUser;

      if (!auth) {
        return res.status(401).json({ statut: false, message: "Non autorisé" });
      }

      const transactions = await Transaction.find({ user: auth._id }).populate(
        "user",
        "username phoneNumber"
      );

      if (!transactions) {
        return res
          .status(404)
          .json({ statut: false, message: "Aucune transaction trouvée" });
      }

      return res.status(200).json({ statut: true, transactions });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }

  static async deleteTransaction(req: AuthRequest, res: Response) {
    try {
      const auth = req.auth as IUser;

      // Vérifier si la transaction existe et appartient à l'utilisateur authentifié
      const transactionId = req.params.id;
      const transaction = await Transaction.findOne({
        _id: transactionId,
        user: auth._id,
      });
      if (!transaction) {
        return res
          .status(404)
          .json({ statut: false, message: "Transaction non trouvée" });
      }

      // Supprimer la transaction de la base de données
      await Transaction.deleteOne({ _id: transactionId });

      return res
        .status(200)
        .json({ statut: true, message: "Transaction supprimée avec succès" });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }

  static async updateTransaction(req: AuthRequest, res: Response) {
    try {
      const auth = req.auth as IUser;

      const transactionId = req.params.id;
      const transaction = await Transaction.findOne({
        _id: transactionId,
        user: auth._id,
      });
      if (!transaction) {
        return res
          .status(404)
          .json({ statut: false, message: "Transaction non trouvée" });
      }
      await Transaction.updateOne({ _id: transactionId }, req.body);

      return res
        .status(200)
        .json({ statut: true, message: "Transaction mise à jour avec succès" });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }

  static async getTransactionById(req: AuthRequest, res: Response) {
    try {
      const auth = req.auth as IUser;

      if (!auth) {
        return res.status(401).json({ statut: false, message: "Non autorisé" });
      }

      const transactionId = req.params.id;

      const transaction = await Transaction.findById(transactionId).populate(
        "user",
        "username phoneNumber"
      );
      if (!transaction) {
        return res
          .status(404)
          .json({ statut: false, message: "Transaction non trouvée" });
      }

      // Vérifie si l'utilisateur authentifié est autorisé à accéder à cette transaction
      if (transaction.user._id.toString() !== auth._id.toString()) {
        return res.status(403).json({
          statut: false,
          message: "Accès non autorisé à cette transaction",
        });
      }

      return res.status(200).json({ statut: true, transaction });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
}

export default TransactionController;
