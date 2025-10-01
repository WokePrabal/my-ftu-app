"use client"; // 👈 sabse upar daalna

import { useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";   // alias use kar (ya ../../../components/Sidebar)
import { useRouter } from "next/navigation"; // ✅ fixed

export default function UploadDocuments() {
  const router = useRouter();
  const [photo, setPhoto] = useState(null);
  const [file, setFile] = useState(null);

  const handleUpload = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleNext = async () => {
    if (!photo || !file) {
      alert("Please upload both photo and supporting document.");
      return;
    }

    // TODO: API call for uploading (photo + file to Cloudinary / backend)
    console.log("Photo:", photo);
    console.log("File:", file);

    router.push("/application/review");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">Upload Documents</h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e, setPhoto)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Upload Supporting Document</label>
          <input
            type="file"
            onChange={(e) => handleUpload(e, setFile)}
            className="border rounded p-2 w-full"
          />
        </div>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleNext}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
