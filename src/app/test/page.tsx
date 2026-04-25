// app/test/page.tsx
export const dynamic = "force-dynamic"; // always re‑render server‑side

export default async function TestPage() {
  // Wait 3 seconds to trigger suspense
  await new Promise((res) => setTimeout(res, 1000));
  return <h1>Test loaded</h1>;
}
