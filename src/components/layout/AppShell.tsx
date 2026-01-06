export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* <Sidebar /> */}

      <div className="flex flex-col flex-1">
        {/* <Topbar /> */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
