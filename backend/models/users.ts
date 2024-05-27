import { Document, Schema, Types, model } from "mongoose";
interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  phoneNumber: number;
  profile: Types.ObjectId;
  balance: number;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const User = model("User", UserSchema);
export { IUser, User };
