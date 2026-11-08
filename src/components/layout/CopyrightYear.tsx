import { cacheLife } from "next/cache";

// The year is computed by code, never hardcoded.
// Cached for a day so it updates automatically when the year changes.
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
