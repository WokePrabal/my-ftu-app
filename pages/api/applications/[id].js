// pages/api/applications/[id].js
import dbConnect from "../../../lib/db";
import Application from "../../../lib/models/Application";

import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (dbErr) {
    console.error("[api/applications/[id]] DB connect error:", dbErr);
    return res.status(500).json({ success: false, error: "DB connect failed" });
  }

  const { id } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: "Invalid id" });
  }

  try {
    if (req.method === "GET") {
      const app = await Application.findById(id);
      if (!app) return res.status(404).json({ success: false, error: "Not found" });
      return res.status(200).json({ success: true, data: app });
    }

    if (req.method === "PUT") {
      const updated = await Application.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ success: false, error: "Not found" });
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === "DELETE") {
      await Application.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    }
    
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error("[api/applications/[id]] error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}