"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white shadow rounded-2xl max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to My FTU App</h1>
        <p className="text-gray-600 mb-6">
          Start your application process by selecting your stream.
        </p>

        <Link
          href="/application/stream"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start Application
        </Link>
      </div>
    </main>
  );
}
