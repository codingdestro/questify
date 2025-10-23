import { LoaderState } from "@/types";
import Loader from ".";

export function LoaderPopUp({state}:{state:LoaderState}) {
  return (
    <main className="fixed top-0 left-0 w-full flex items-center justify-center backdrop-blur-sm bg-black/30 h-full z-40">
      <Loader state={state} size="md" className="bg-white rounded-lg"/>
    </main>
  );
}
