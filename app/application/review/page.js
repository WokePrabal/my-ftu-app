"use client"; // Hooks ke liye zaroori hai

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ correct import
import Sidebar from "@/components/Sidebar";   // ✅ absolute import use kar

export default function Review() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Dummy fetch ya localStorage se data simulate
    const savedData = {
      stream: "Bachelor’s",
      program: "Computer Science",
      documents: ["Transcript.pdf", "CV.pdf"],
    };
    setFormData(savedData);
  }, []);

  const handleSubmit = async () => {
    try {
      // Example: API ko post kar sakte ho
      // await axios.post("/api/submit", formData);

      console.log("Form submitted:", formData);
      alert("Application Submitted!");
      router.push("/"); // ✅ redirect back to home
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  if (!formData) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex">
      <Sidebar progress={{ review: true }} />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">Review & Submit</h1>

        <div className="mb-6 space-y-2">
          <p>
            <strong>Stream:</strong> {formData.stream}
          </p>
          <p>
            <strong>Program:</strong> {formData.program}
          </p>
          <p>
            <strong>Documents:</strong>
          </p>
          <ul className="list-disc list-inside">
            {formData.documents.map((doc, idx) => (
              <li key={idx}>{doc}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}
