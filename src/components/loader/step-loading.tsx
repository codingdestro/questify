import React, { useEffect, useState } from "react";
import { Loader2, Check, Clock } from "lucide-react";

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepLoadingProps {
  steps?: Step[];
  currentStep?: number;
  autoAnimate?: boolean;
  animationDuration?: number;
  className?: string;
}

const defaultSteps: Step[] = [
  {
    id: "analyzing",
    label: "Analyzing request",
    description: "Processing your input...",
  },
  {
    id: "generating",
    label: "Generating content",
    description: "AI is creating your content...",
  },
  {
    id: "refining",
    label: "Refining results",
    description: "Polishing the output...",
  },
  { id: "finalizing", label: "Finalizing", description: "Almost done..." },
];

export const StepLoading: React.FC<StepLoadingProps> = ({
  steps = defaultSteps,
  currentStep: controlledStep,
  autoAnimate = true,
  animationDuration = 8000,
  className = "",
}) => {
  const [internalStep, setInternalStep] = useState(0);
  const [dots, setDots] = useState("");

  const currentStep =
    controlledStep !== undefined ? controlledStep : internalStep;

  // Auto-animate through steps
  useEffect(() => {
    if (!autoAnimate || controlledStep !== undefined) return;

    const interval = setInterval(() => {
      setInternalStep((prev) => (prev < steps.length - 1 ? prev + 1 : 3));
    }, animationDuration);

    return () => clearInterval(interval);
  }, [autoAnimate, animationDuration, steps.length, controlledStep]);

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[300px] p-8 ${className}`}
    >
      <div className="w-full max-w-3xl space-y-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isPending = index > currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-start gap-4 transition-all duration-500 ${
                isActive
                  ? "opacity-100 scale-100 translate-x-0"
                  : isPending
                  ? "opacity-30 scale-95 translate-x-2"
                  : "opacity-50 scale-95 -translate-x-2"
              }`}
            >
              {/* Step indicator */}
              <div className="shrink-0 mt-0.5">
                {isCompleted ? (
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md animate-in zoom-in duration-300">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                ) : isActive ? (
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center bg-white dark:bg-gray-800">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Step content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <h3
                  className={`font-semibold text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : isCompleted
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {step.label}
                  {isActive && (
                    <span className="inline-block w-6 text-left animate-pulse">
                      {dots}
                    </span>
                  )}
                </h3>
                {step.description && (
                  <p
                    className={`text-xs mt-1 transition-colors duration-300 ${
                      isActive
                        ? "text-gray-600 dark:text-gray-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepLoading;
