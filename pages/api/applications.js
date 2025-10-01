import dbConnect from "@/utils/db";
import Application from "@/models/Application";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const application = await Application.create(req.body);
      res.status(201).json({ success: true, data: application });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const applications = await Application.find({});
      res.status(200).json({ success: true, data: applications });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
