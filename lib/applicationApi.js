// lib/applicationApi.js

/**
 * Fetch application by id
 */
export async function fetchApplication(id) {
  try {
    const res = await fetch(`/api/applications/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const j = await res.json();
    return j.data;
  } catch (e) {
    console.error("fetchApplication error:", e);
    return null;
  }
}

/**
 * Create or update application
 * - If id present → update
 * - Else → create new
 */
export async function saveOrUpdateApplication(id, partial, router, redirectTo) {
  if (id) {
    // Update
    const res = await fetch(`/api/applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partial),
    });
    const j = await res.json();
    if (res.ok) {
      if (redirectTo) router.push(`${redirectTo}?id=${id}`);
      return j.data;
    }
    throw new Error(j.error || "Update failed");
  } else {
    // Create
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partial),
    });
    const j = await res.json();
    if (res.ok) {
      const newId = j.data._id;
      if (redirectTo) router.replace(`${redirectTo}?id=${newId}`);
      return j.data;
    }
    throw new Error(j.error || "Create failed");
  }
}