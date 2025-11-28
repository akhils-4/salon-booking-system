import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm md:text-base text-gray-500">Error 404</p>
        <h1 className="mt-2 text-2xl md:text-5xl font-extrabold text-gray-900">
          Page not found
        </h1>
        <p className="mt-3 text-gray-600 max-w-md mx-auto">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-black text-white px-5 py-3
                       font-semibold hover:bg-gray-800 transition-colors"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-gray-100 text-gray-900 px-5 py-3
                       font-semibold hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
