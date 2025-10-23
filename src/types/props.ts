import { LoaderState } from "@/types";
export interface LoaderProps {
  state?: LoaderState;
  message?: string;
  errorMessage?: string;
  successMessage?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}
