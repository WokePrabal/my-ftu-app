"use client";
import { useRouter } from "next/navigation";

export default function ApplicationCard({ app }) {
  const router = useRouter();

  const handleClick = () => {
    if (app.status === "Submitted") {
      alert("Application already submitted");
      return;
    }
    router.push(`/application/stream?id=${app.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded p-4 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{app.title}</h3>
        <span
          className={
            "text-sm px-2 py-1 rounded " +
            (app.status === "Submitted"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800")
          }
        >
          {app.status}
        </span>
      </div>
    </div>
  );
}