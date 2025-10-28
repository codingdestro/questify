"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max--md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl mb-8 font-bold text-gray-200 dark:text-gray-700">
            404
          </h1>
          <div className="text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 -mt-8">
            Oops!
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600  mb-8 text-sm sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700  bg-white  hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
