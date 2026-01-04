export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-primary sm:items-start">
        <h1 className="text-5xl font-bold  dark:text-white">
          Welcome to SoloLawyer
        </h1>
        <p className="mt-4 text-lg dark:text-white">
          Manage your legal practice efficiently with our all-in-one solution.
        </p>
      </main>
    </div>
  );
}
