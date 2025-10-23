"use client";

import React, { useState } from "react";
import Loader from "./index";

/**
 * Example component demonstrating how to use the Loader component
 * This file is for reference only and can be deleted if not needed
 */
const LoaderExample: React.FC = () => {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const simulateLoading = () => {
    setState("loading");
    setTimeout(() => {
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    }, 2000);
  };

  const simulateError = () => {
    setState("loading");
    setTimeout(() => {
      setState("error");
      setTimeout(() => setState("idle"), 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Loader Component Examples
        </h1>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={simulateLoading}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition"
          >
            Simulate Success
          </button>
          <button
            onClick={simulateError}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Simulate Error
          </button>
          <button
            onClick={() => setState("idle")}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Reset
          </button>
        </div>

        {/* Dynamic State Display */}
        <div className="card-mint">
          <h2 className="text-2xl font-semibold mb-4">Dynamic State</h2>
          <Loader state={state} />
        </div>

        {/* Size Variations */}
        <div className="card-mint">
          <h2 className="text-2xl font-semibold mb-4">Size Variations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-center font-medium mb-2">Small</h3>
              <Loader state="loading" size="sm" message="Loading..." />
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-center font-medium mb-2">Medium (Default)</h3>
              <Loader state="loading" size="md" message="Loading..." />
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-center font-medium mb-2">Large</h3>
              <Loader state="loading" size="lg" message="Loading..." />
            </div>
          </div>
        </div>

        {/* State Examples */}
        <div className="card-mint">
          <h2 className="text-2xl font-semibold mb-4">All States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-center font-medium mb-2">Loading State</h3>
              <Loader
                state="loading"
                message="Processing your request..."
              />
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-center font-medium mb-2">Success State</h3>
              <Loader
                state="success"
                successMessage="Data loaded successfully!"
              />
            </div>
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-center font-medium mb-2">Error State</h3>
              <Loader
                state="error"
                errorMessage="Failed to load data. Please try again."
              />
            </div>
          </div>
        </div>

        {/* Custom Messages */}
        <div className="card-mint">
          <h2 className="text-2xl font-semibold mb-4">Custom Messages</h2>
          <div className="space-y-4">
            <Loader
              state="loading"
              message="Uploading your files..."
              size="md"
            />
            <Loader
              state="success"
              successMessage="Profile updated successfully! 🎉"
              size="md"
            />
            <Loader
              state="error"
              errorMessage="Network connection failed. Check your internet."
              size="md"
            />
          </div>
        </div>

        {/* Usage Code Examples */}
        <div className="card-mint">
          <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
          <div className="space-y-4 text-sm">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Basic Usage:</h3>
              <pre className="text-xs overflow-x-auto">
{`<Loader state="loading" />`}
              </pre>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">With Custom Message:</h3>
              <pre className="text-xs overflow-x-auto">
{`<Loader
  state="success"
  successMessage="Operation completed!"
  size="lg"
/>`}
              </pre>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">In an Async Operation:</h3>
              <pre className="text-xs overflow-x-auto">
{`const [loaderState, setLoaderState] = useState("idle");

const handleSubmit = async () => {
  setLoaderState("loading");
  try {
    await api.submitData();
    setLoaderState("success");
  } catch (error) {
    setLoaderState("error");
  }
};

<Loader state={loaderState} />`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderExample;
