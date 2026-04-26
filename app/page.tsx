export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-3xl px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">
          TaskForge
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          A modern task management platform for students, founders, and teams.
        </p>

        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold">
          Get Started
        </button>
      </div>
    </main>
  );
}