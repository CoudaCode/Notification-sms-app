import { Router } from "express";
import ProfileController from "../controllers/profile";
import Auth from "../middlewares/auth";
const router = Router();

router.get("/:id", Auth, ProfileController.getProfile);
router.post("/", Auth, ProfileController.createProfile);
router.put("/:id", Auth, ProfileController.updateProfile);
router.delete("/:id", Auth, ProfileController.deleteProfile);

export default router;
