import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

// 1️⃣ Define the Post interface
export interface IPost extends Document {
  title: string;
  content: string; // Markdown format
  image?: string; // URL or file path
  author: IUser["_id"];
}

// 2️⃣ Define the Post schema
const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // Store Markdown text
    image: { type: String }, // Image URL or local file path
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

// 3️⃣ Create the Post model
const Post = mongoose.model<IPost>("Post", PostSchema);
export default Post;
