"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
export default function Page() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const addUser = async () => {
    try {
      const docs = await getDocs(collection(db, "users"));
      docs.docs.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex flex-col gap-4 p-5 items-center justify-center">
      <h1>Login</h1>
      <button
        className="p-5 rounded-lg shadow-md border border-gray-200 cursor-pointer"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>
      <button
        onClick={addUser}
        className="shadow-md rounded-lg p-3 bg-blue-400 text-white"
      >
        save dummy data
      </button>
    </main>
  );
}
