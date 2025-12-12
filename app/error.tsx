'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-8xl mb-4">⚠️</div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Something went wrong!</h1>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8">
          <p className="text-lg text-slate-600 mb-4">
            We encountered an unexpected error. Don't worry, our team has been notified.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-left">
            <p className="text-sm font-mono text-red-800">{error.message}</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold border-2 border-slate-200 hover:border-blue-500 transition-all"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
}
