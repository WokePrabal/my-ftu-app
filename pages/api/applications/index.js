// pages/api/applications/index.js
import dbConnect from "../../../lib/db";
import Application from "../../../lib/models/Application";

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (err) {
    console.error("[api/applications] DB connect error:", err);
    return res.status(500).json({ success: false, error: "DB connect failed" });
  }

  try {
    if (req.method === "POST") {
      const { fullname, email, stream, program, photoUrl, documentUrl, status } = req.body || {};
      // create a draft even if fullname/email missing
      const application = await Application.create({
        fullname: fullname || "",
        email: email || "",
        stream: stream || "",
        program: program || "",
        photoUrl: photoUrl || "",
        documentUrl: documentUrl || "",
        status: status || "Draft",
      });
      return res.status(201).json({ success: true, data: application });
    }

    if (req.method === "GET") {
      const { email } = req.query;
      if (email) {
        const app = await Application.findOne({ email }).sort({ updatedAt: -1 });
        return res.status(200).json({ success: true, data: app });
      }
      const apps = await Application.find().sort({ createdAt: -1 }).limit(100);
      return res.status(200).json({ success: true, data: apps });
    }

    return res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (err) {
    console.error("[api/applications] error:", err);
    return res.status(500).json({ success: false, error: err.message || "Server error" });
  }
}