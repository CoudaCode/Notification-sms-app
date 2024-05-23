import { Request, Response } from "express";
import { AuthRequest } from "../interface/authRequest";
import { compareMdpHash, hasHMdp } from "../utils/Hash";
import { generateToken, tokenVerify } from "../utils/token";
import { IUser, User } from "./../models/users";
class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { username, phoneNumber, password } = req.body;
      //$or ==> operator OU logique
      // Verifie si un user a deja un username ou un phoneNumber existant dans la bd
      const exist: IUser | null = await User.findOne({
        $or: [{ username }, { phoneNumber }],
      });
      if (exist)
        return res
          .status(400)
          .json({ statut: false, message: "ce user existe deja" });
      const newUser = await User.create({
        username,
        phoneNumber,
        password: await hasHMdp(password),
      });

      if (!newUser)
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la création" });

      res.status(200).json({
        statut: true,
        message: { ...newUser.toObject(), password: undefined },
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async updateUser(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id;
      const auth: IUser = req.auth as IUser;
      const exist: IUser | null = await User.findById(id);
      const { password, newPassword, ...body } = req.body;

      if (!exist)
        return res
          .status(400)
          .json({ statut: false, message: "ce user n'existe pas" });

      if (auth && auth._id !== id) {
        return res
          .status(400)
          .json({ statut: false, message: "action non autorisé" });
      }

      let updateUser: object;

      if (newPassword) {
        updateUser = await User.updateOne(
          { _id: id },
          { password: await hasHMdp(newPassword), ...body }
        );
      } else {
        updateUser = await User.updateOne({ _id: id }, { ...body });
      }

      if (!updateUser)
        return res
          .status(400)
          .json({ statut: false, message: "error lors de la modification" });

      return res.status(200).json({
        statut: true,
        message: "use modifié !!!",
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async deleteUser(req: AuthRequest, res: Response) {
    try {
      const id: string = req.params.id;
      const auth: IUser = req.auth as IUser;
      const user: IUser | null = await User.findById(id);
      if (id !== auth._id)
        return res
          .status(400)
          .json({ statut: false, message: "action non autorisé" });

      if (!user)
        return res
          .status(400)
          .json({ statut: false, message: "Ce user n'existe pas" });

      await User.deleteOne({ _id: id });
      res.status(400).json({ statut: 200, message: "succès" });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async getUser(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const user: IUser | null = await User.findById(id);
      if (!user)
        return res
          .status(400)
          .json({ statut: false, message: "ce user n'existe pas" });

      res.status(200).json({
        statut: true,
        message: { ...user.toObject(), password: undefined },
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { phoneNumber, password } = req.body;

      const exist: IUser | null = await User.findOne({ phoneNumber });

      if (exist && (await compareMdpHash(password, exist.password))) {
        res.cookie(
          "token",
          generateToken({ ...exist.toObject(), password: undefined }),
          {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          }
        );
        return res.status(200).json({
          statut: true,
          message: { ...exist.toObject(), password: undefined },
          token: generateToken({ ...exist.toObject(), password: undefined }),
        });
      }
      res.status(400).json({
        statut: false,
        message: "phoneNumber ou mot de passe incorrect",
      });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async checkValidateToken(req: Request, res: Response) {
    try {
      const token =
        req.headers.authorization?.split(" ")[1] || req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: "Token non fourni" });
      }

      // Utilisez votre fonction pour vérifier le token
      const userData = tokenVerify(token);

      if (userData) {
        // Token valide, renvoyez les informations de l'utilisateur
        return res.status(200).json(userData);
      } else {
        // Token invalide ou expiré
        return res.status(401).json({ message: "Token invalide ou expiré" });
      }
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
}
export default UserController;
