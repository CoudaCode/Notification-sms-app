import { Document, Schema, Types, model } from "mongoose";
interface IProfile extends Document {
  _id: string;
  fullName: string;
  age: number;
  email: string;
  user: Types.ObjectId;
}

const ProfileSchema = new Schema<IProfile>({
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Profile = model("Profile", ProfileSchema);

export { IProfile, Profile };
