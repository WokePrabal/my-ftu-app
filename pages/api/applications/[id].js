import dbConnect from "@/utils/db";
import Application from "@/models/Application";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const application = await Application.findById(id);
      if (!application) return res.status(404).json({ success: false });
      res.status(200).json({ success: true, data: application });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === "PUT") {
    try {
      const application = await Application.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!application) return res.status(404).json({ success: false });
      res.status(200).json({ success: true, data: application });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === "DELETE") {
    try {
      const deleted = await Application.deleteOne({ _id: id });
      if (!deleted.deletedCount) return res.status(404).json({ success: false });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
