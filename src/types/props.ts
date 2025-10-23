import { LoaderState } from "@/types";

export interface LoaderProps {
  state?: LoaderState;
  message?: string;
  errorMessage?: string;
  successMessage?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface CardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | "auto";
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  className?: string;
  minCardWidth?: string;
  maxCardWidth?: string;
}
