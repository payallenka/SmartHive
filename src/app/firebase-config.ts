import { initializeApp } from "firebase/app";
import { 
  getFirestore, doc, setDoc, getDoc, updateDoc 
} from "firebase/firestore";
import { 
  getAuth, GoogleAuthProvider, User 
} from "firebase/auth";
import { 
  getStorage, ref, getDownloadURL, uploadBytes 
} from "firebase/storage";

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
const storage = getStorage(app); // ✅ Added Firebase Storage

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
    profilePicture: user.photoURL || "/default-profile.png", // Default profile pic
    createdAt: user.metadata.creationTime,
    lastLoginAt: user.metadata.lastSignInTime,
  };

  if (!userSnap.exists()) {
    await setDoc(userRef, userData);
  } else {
    await updateDoc(userRef, { lastLoginAt: user.metadata.lastSignInTime });
  }
};

// 🔹 Upload Profile Picture to Firebase Storage
const uploadProfilePicture = async (uid: string, file: File): Promise<string | null> => {
  try {
    const storageRef = ref(storage, `users/${uid}/profile.jpg`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("❌ Error uploading profile picture:", error);
    return null;
  }
};

// 🔹 Update User Profile in Firestore
const updateUserProfile = async (uid: string, name: string, profilePicture?: string) => {
  const userRef = doc(db, "users", uid);
  const updateData: { name: string; profilePicture?: string } = { name };

  if (profilePicture) {
    updateData.profilePicture = profilePicture;
  }

  await updateDoc(userRef, updateData);
};

// 🔹 Export Firebase Utilities
export { auth, googleProvider, db, storage, saveUserToFirestore, uploadProfilePicture, updateUserProfile };
