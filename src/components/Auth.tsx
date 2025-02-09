"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider, saveUserToFirestore } from "../app/firebase-config";
import { signInWithPopup, signOut, User, onAuthStateChanged } from "firebase/auth";

const Auth: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push("/dashboard"); 
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      await saveUserToFirestore(result.user);
      router.push("/dashboard"); 
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/"); 
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {user ? (
        <div className="text-center">
          <h2 className="text-2xl">Welcome, {user.displayName}!</h2>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={loginWithGoogle}>
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
