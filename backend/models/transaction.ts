import { Document, Schema, Types, model } from "mongoose";

interface ITransaction extends Document {
  _id: string;
  amount: number;
  date: Date;
  product: [];
  user: Types.ObjectId;
  status: string;
}

const TransactionSchema = new Schema<ITransaction>({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  product: [{ type: Object, required: true }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "failed"], // Valeurs possibles du statut
    default: "pending", // Statut par défaut
  },
});

const Transaction = model("Transaction", TransactionSchema);

export { ITransaction, Transaction };
