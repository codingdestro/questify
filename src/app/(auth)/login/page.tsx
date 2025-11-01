import { auth } from "@clerk/nextjs/server";
import { SignedOut, SignUpButton, SignInButton, SignIn } from "@clerk/nextjs";

export default async function Page() {
  // Use `auth()` to access `isAuthenticated` - if false, the user is not signed in
  const { isAuthenticated } = await auth();

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return (
      <SignedOut>
        <div className="flex items-center justify-center min-h-[90vh] ">
          <div className="w-82 rounded-lg shadow-md rouned-lg border border-gray-200 flex flex-col space-y-5 p-5">
            <SignInButton fallbackRedirectUrl={"/home"}>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton fallbackRedirectUrl={"/home"}>
              <button className="border border-[#6c47ff] rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>
    );
  }

  // Get the Backend API User object when you need access to the user's information

  // Use `user` to render user details or create UI elements
  return (
    <div>
      <SignIn fallbackRedirectUrl={"/home"} routing="hash" />
    </div>
  );
}
