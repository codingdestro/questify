import { Loader2 } from "lucide-react";

export default function SimpleLoading() {
  return (
    <div className="flex items-center justify-center">
      <Loader2
        className="h-6 w-6 animate-spin data-[variant='white']:text-white data-[variant=['blue']:text-blue-500"
        data-variant="blue"
      />
    </div>
  );
}
