import { Document, Schema, Types, model } from "mongoose";
interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  phoneNumber: number;
  profile: Types.ObjectId;
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
});

const User = model("User", UserSchema);
export { IUser, User };
