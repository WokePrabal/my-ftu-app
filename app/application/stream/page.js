"use client"; // client component banane ke liye zaroori

import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "../../components/sidebar";

export default function StreamPage() {
  const router = useRouter();

  const handleSelect = async (stream) => {
    // yahan tu API call ya state save kar sakta hai
    console.log("Selected stream:", stream);

    // Next page pe redirect
    router.push("/application/program");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Select Stream</h1>
        <div className="space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => handleSelect("bachelors")}
          >
            Bachelor’s
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => handleSelect("masters")}
          >
            Master’s
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded"
            onClick={() => handleSelect("phd")}
          >
            PhD
          </button>
        </div>
      </div>
    </div>
  );
}
