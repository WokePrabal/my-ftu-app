import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    fullname: { type: String, default: "" }, 
    email: { type: String, default: "" },
    stream: { type: String, default: "" },
    program: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    documentUrl: { type: String, default: "" },
    status: { type: String, default: "Draft" }
  },
  { timestamps: true }
);

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);