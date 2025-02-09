import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, User } from "firebase/auth";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBk7BP5A8g8qEhiqU7Sngg9YEe-9fRA4go",
  authDomain: "smarthive-b2b6e.firebaseapp.com",
  projectId: "smarthive-b2b6e",
  storageBucket: "smarthive-b2b6e.appspot.com",
  messagingSenderId: "197720552452",
  appId: "1:197720552452:web:465b71fece32dd49b77151",
  measurementId: "G-VF1TE78SF1"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Authentication Provider (Google Only)
const googleProvider = new GoogleAuthProvider();

// 🔹 Save or Update User Data in Firestore
const saveUserToFirestore = async (user: User | null): Promise<void> => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  const userData = {
    uid: user.uid,
    name: user.displayName || "Anonymous",
    email: user.email,
    profilePicture: user.photoURL || "/default-profile.png", // Use default if no profile picture
    createdAt: user.metadata.creationTime,
    lastLoginAt: user.metadata.lastSignInTime,
  };

  if (!userSnap.exists()) {
    await setDoc(userRef, userData);
  } else {
    await updateDoc(userRef, { lastLoginAt: user.metadata.lastSignInTime });
  }
};

// 🔹 Update User Profile in Firestore
const updateUserProfile = async (uid: string, name: string, profilePicture: string) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { name, profilePicture });
};

// 🔹 Export Firebase Utilities
export { auth, googleProvider, db, saveUserToFirestore, updateUserProfile };
