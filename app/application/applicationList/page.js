// app/applicationList/page.js
import ApplicationCard from "../../components/ApplicationCard";


async function fetchApplications() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/applications`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch applications");
  const json = await res.json();
  return json.data || [];
}

export default async function Page() {
  const apps = await fetchApplications();

  return (
    <>
      
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Applications</h1>
        <div className="grid gap-4">
          {apps.map((app) => (
            <ApplicationCard
              key={app._id}
              app={{
                id: app._id,
                title: app.fullname || app.program || "Untitled",
                status: app.status || "Draft",
              }}
            />
          ))}
        </div>
      </main>
    </>
  );
}