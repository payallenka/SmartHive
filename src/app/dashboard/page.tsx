"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config"; 
import Image from "next/image";

interface UserData {
  name: string;
  email: string;
  profilePicture?: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserData(currentUser.uid);
      } else {
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // 🔹 Fetch User Data
  const fetchUserData = async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserData;
        setUserData(data);
        setName(data.name);
      } else {
        console.warn("⚠️ No user data found in Firestore.");
      }
    } catch (error) {
      console.error("❌ Firestore Error:", error);
    }
  };

  // 🔹 Update Profile Name
  const handleUpdateProfile = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name });

      setUserData((prev) => (prev ? { ...prev, name } : null));

      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>

        {loading ? (
          <p className="text-lg text-gray-600 mt-4">🔄 Loading user data...</p>
        ) : userData ? (
          <>
            {/* 🔹 Profile Image */}
            <div className="flex flex-col items-center mt-4">
              <Image
                src={userData.profilePicture || "/default-profile.png"}
                alt="Profile"
                width={112}
                height={112}
                className="rounded-full border-4 border-gray-300 object-cover shadow-md"
                unoptimized 
              />
            </div>

            {/* 🔹 User Info */}
            <p className="text-xl font-semibold mt-3">{userData.name}</p>
            <p className="text-gray-500 text-sm">{userData.email}</p>

            {/* 🔹 Profile Update Fields */}
            <div className="mt-6">
              <label className="block text-left text-gray-600 text-sm font-medium">
                Update Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new name"
              />
              <button
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300"
                onClick={handleUpdateProfile}
              >
                Save Changes
              </button>
            </div>

            {/* 🔹 Logout Button */}
            <button
              className="mt-6 w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-lg text-gray-600 mt-4">⚠️ No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
