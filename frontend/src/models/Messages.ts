import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
  role: { type: String, require: true },
  content: { type: String, require: true },
  createdAt: { type: String, default: Date.now() },
});

export default mongoose.models.Messages ||
  mongoose.model("Messages", MessageSchema);
