"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { fetchApplication } from "@/lib/applicationApi";

export default function Review() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [app, setApp] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      alert("No application found. Please start again.");
      router.push("/application/stream");
      return;
    }
    fetchApplication(id).then((data) => {
      if (!data) {
        alert("Application not found");
        router.push("/application/stream");
        return;
      }
      setApp(data);
      setProgress({
        selectStream: !!data.stream,
        program: !!data.program,
        personalDetails: !!data.fullname && !!data.email,
        upload: !!data.photoUrl && !!data.documentUrl,
        review: data.status === "Submitted",
      });
    });
  }, [id]);

  if (!app) return <p className="p-6">Loading...</p>;

  // check missing fields
  const requiredMissing = [];
  if (!app.stream) requiredMissing.push("Stream");
  if (!app.program) requiredMissing.push("Program");
  if (!app.fullname) requiredMissing.push("Full name");
  if (!app.email) requiredMissing.push("Email");
  if (!app.photoUrl) requiredMissing.push("Profile photo");
  if (!app.documentUrl) requiredMissing.push("Supporting document");

  // submit only if nothing missing + not already submitted
  const canSubmit = requiredMissing.length === 0 && app.status !== "Submitted";

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Submitted" }),
      });
      const j = await res.json();
      if (res.ok) {
        alert("Application submitted!");
        router.push("/");
      } else {
        alert(j.error || "Submit failed");
      }
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar progress={progress} />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">Review & Submit</h1>

        <div className="mb-6 space-y-2">
          <p><strong>Stream:</strong> {app.stream || <em>Not provided</em>}</p>
          <p><strong>Program:</strong> {app.program || <em>Not provided</em>}</p>
          <p><strong>Full name:</strong> {app.fullname || <em>Not provided</em>}</p>
          <p><strong>Email:</strong> {app.email || <em>Not provided</em>}</p>
          <div>
            <strong>Photo:</strong>{" "}
            {app.photoUrl ? (
              <img src={app.photoUrl} alt="photo" style={{ maxWidth: 200 }} />
            ) : (
              <em>Not provided</em>
            )}
          </div>
          <div>
            <strong>Document:</strong>{" "}
            {app.documentUrl ? (
              <a
                href={`/application/preview/${app._id}`}
                target="_blank"
                className="text-blue-600 underline"
              >
                Open
              </a>
            ) : (
              <em>Not provided</em>
            )}
          </div>
        </div>

        {requiredMissing.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-100 border rounded">
            <strong>Pending fields:</strong>
            <ul className="list-disc list-inside">
              {requiredMissing.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-700">
              Please go back and complete the missing fields before submitting.
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || loading}
          className={`px-6 py-2 rounded ${
            canSubmit
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-700 cursor-not-allowed"
          }`}
        >
          {loading
            ? "Submitting..."
            : app.status === "Submitted"
            ? "Already Submitted"
            : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
