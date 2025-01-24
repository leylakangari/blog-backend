import mongoose, { Schema, Document } from "mongoose";

// 1️⃣ Define the User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// 2️⃣ Define the User schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

// 3️⃣ Create the User model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
