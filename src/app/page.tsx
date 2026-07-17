import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-600">
        Task Manager
      </h1>

      <p className="mt-4 text-gray-600">
        Manage your daily tasks efficiently.
      </p>

      <div className="flex gap-4 mt-8">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
        >
          Register
        </Link>
      </div>
    </main>
  );
}