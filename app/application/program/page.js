"use client"; // ye line sabse upar daalni hai

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ fixed
import Sidebar from "@/components/Sidebar";   // ✅ use alias (ya relative sahi path)

const OPTIONS = {
  bachelors: [
    "Bachelor of Science in Computer Science (BSCS)",
    "Bachelor of Science in Business Administration (BSBA)",
  ],
  masters: [
    "Master of Science in Computer Science (MSCS)",
    "Master of Business Administration (MBA)",
  ],
  phd: [
    "Doctorate in Computer Science",
    "Doctorate in Business Administration",
  ],
};

export default function ProgramPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");

  useEffect(() => {
    // Example: tu API call se bhi fetch kar sakta hai, abhi dummy logic
    const stream = "bachelors"; // stream tu localStorage, context, ya API se laa
    setSelectedStream(stream);
    setPrograms(OPTIONS[stream] || []);
  }, []);

  const handleNext = () => {
    if (!selectedProgram) {
      alert("Please select a program before continuing!");
      return;
    }
    router.push("/application/upload");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">Program of Study</h1>
        <select
          className="border rounded p-2 mb-4 w-full"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
        >
          <option value="">-- Select a program --</option>
          {programs.map((p, idx) => (
            <option key={idx} value={p}>
              {p}
            </option>
          ))}
        </select>

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
