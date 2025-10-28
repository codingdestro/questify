"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [_, setUser] = useState<any>(null); //eslint-disable-line 

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("User:", result.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const { user: authUser, loading } = useAuth();
  if (loading) {
    return <p>Loading...</p>;
  }

  if(authUser) {
    console.log("Authenticated User:", authUser);
  }

  return (
    <div className="flex flex-col items-center mt-24 space-y-4">
      {authUser ? (
        <>
          <p>Welcome, {authUser.displayName}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
