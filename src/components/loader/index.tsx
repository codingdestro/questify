import React from "react";
import { LoaderProps } from "@/types/props";

const Loader: React.FC<LoaderProps> = ({
  state = "loading",
  message = "Loading...",
  errorMessage = "Something went wrong. Please try again.",
  successMessage = "Success!",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  if (state === "idle") {
    return null;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-6 ${className}`}
      role="status"
      aria-live="polite"
    >
      {state === "loading" && (
        <>
          <div className="relative">
            <div
              className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary rounded-full animate-spin`}
              aria-hidden="true"
            />
          </div>
          <p className={`${textSizeClasses[size]} text-gray-700 font-medium`}>
            {message}
          </p>
        </>
      )}

      {state === "success" && (
        <>
          <div
            className={`${sizeClasses[size]} rounded-full bg-green-100 flex items-center justify-center animate-scale-in`}
          >
            <svg
              className={`${
                size === "sm"
                  ? "w-4 h-4"
                  : size === "md"
                  ? "w-6 h-6"
                  : "w-10 h-10"
              } text-green-600`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className={`${textSizeClasses[size]} text-green-700 font-medium`}>
            {successMessage}
          </p>
        </>
      )}

      {state === "error" && (
        <>
          <div
            className={`${sizeClasses[size]} rounded-full bg-red-100 flex items-center justify-center animate-shake`}
          >
            <svg
              className={`${
                size === "sm"
                  ? "w-4 h-4"
                  : size === "md"
                  ? "w-6 h-6"
                  : "w-10 h-10"
              } text-red-600`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <p className={`${textSizeClasses[size]} text-red-700 font-medium`}>
            {errorMessage}
          </p>
        </>
      )}
    </div>
  );
};

export default Loader;
