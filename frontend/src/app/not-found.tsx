import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-slate-50 text-slate-800">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 text-center space-y-4 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">404 - Page Not Found</h2>
        <p className="text-sm text-slate-600">Could not find the requested page.</p>
        <Link
          href="/"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
