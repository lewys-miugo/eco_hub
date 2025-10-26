export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <div className="w-full max-w-2xl">
        <div className="rounded-lg shadow-2xl bg-white p-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-[#163466]">
            Eco Hub
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Eco Hub Application with Flask, PostgreSQL, Next.js & Tailwind
          </p>
          <p className="text-center text-green-600 font-semibold">
            Frontend is working! You can now access the Advisor page at /advisor
          </p>
        </div>
      </div>
    </main>
  );
}
