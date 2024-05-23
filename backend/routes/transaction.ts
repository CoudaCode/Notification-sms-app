import { Router } from "express";
import TransactionController from "../controllers/transaction";
import Auth from "../middlewares/auth";
const router = Router();

router.get("/:id", Auth, TransactionController.getTransactionById);
router.post("/", Auth, TransactionController.createTransaction);
router.put("/:id", Auth, TransactionController.updateTransaction);
router.delete("/:id", Auth, TransactionController.deleteTransaction);
router.get("/", Auth, TransactionController.getTransactions);

export default router;
