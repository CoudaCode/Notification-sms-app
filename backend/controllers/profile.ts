import { Response } from "express";
import { AuthRequest } from "../interface/authRequest";
import { IProfile, Profile } from "../models/profile";
import { IUser } from "../models/users";

class ProfileController {
  static async createProfile(req: AuthRequest, res: Response) {
    try {
      const { fullName, email, age } = req.body;
      const auth: IUser = req.auth as IUser;

      if (!auth) {
        return res.status(404).json({
          statut: false,
          message: "vous etes pas autorise a créer un profile",
        });
      }

      const newProfile: IProfile = await Profile.create({
        fullName,
        email,
        age,
        user: auth._id,
      });

      return res.status(201).json({ statut: true, message: newProfile });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id;
      const auth: IUser = req.auth as IUser;

      if (!auth) {
        return res.status(404).json({
          statut: false,
          message: "vous etes pas autorise a modifier un profile",
        });
      }

      const profile: IProfile | null = await Profile.findById(id);

      if (!profile) {
        return res.status(404).json({
          statut: false,
          message: "profile non trouvé",
        });
      }

      if (profile.user.toString() !== auth._id) {
        return res.status(404).json({
          statut: false,
          message: "vous etes pas autorise a modifier ce profile",
        });
      }

      const newProfile = await Profile.updateOne(
        { _id: id },
        { ...req.body, user: auth._id }
      );

      if (!newProfile) {
        return res.status(404).json({
          statut: false,
          message: "erreur lors de la modification",
        });
      }

      return res
        .status(200)
        .json({ statut: true, message: "profile modifié !!!" });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async deleteProfile(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id;
      const auth = req.auth as IUser;

      const profile: IProfile | null = await Profile.findById(id);

      if (!profile) {
        return res
          .status(404)
          .json({ statut: false, message: "profile non trouvé" });
      }

      if (auth._id !== profile?.user.toString()) {
        return res.status(404).json({
          statut: false,
          message: "vous etes pas autorise a supprimer ce profile",
        });
      }

      await Profile.deleteOne({ _id: id });

      return res
        .status(200)
        .json({ statut: true, message: "profile supprimé !!!" });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const profile: IProfile | null = await Profile.findById(
        req.params.id
      ).populate("user", "username phoneNumber password");
      const auth = req.auth as IUser;

      if (!profile) {
        return res
          .status(404)
          .json({ statut: false, message: "profile non trouvé" });
      }

      if (auth._id.toString() !== profile.user._id.toString()) {
        return res.status(403).json({
          statut: false,
          message: "Vous n'êtes pas autorisé à voir ce profil",
        });
      }

      return res.status(200).json({ statut: true, message: profile });
    } catch (e: any) {
      if (e instanceof Error) {
        res.status(500).json({ statut: false, message: e.message });
      } else {
        res.status(500).json({ statut: false, message: "An error occurred" });
      }
    }
  }
}

export default ProfileController;
