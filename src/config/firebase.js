// src/config/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Replace these with your Firebase project's credentials
const firebaseConfig = {
  apiKey: "AIzaSyBfr38jMG_I9tIcgzMIQfCf7q6YBPH__mA",
  authDomain: "skyintern-d2174.firebaseapp.com",
  projectId: "skyintern-d2174",
  storageBucket: "skyintern-d2174.firebasestorage.app",
  messagingSenderId: "947715013776",
  appId: "1:947715013776:web:a7905de24a7babc97f6c15",
  measurementId: "G-BM8PL1972G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Social auth
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithGithub = () => signInWithPopup(auth, githubProvider);

// Email/password
export const signUpWithEmail = async (email, password, displayName) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(cred.user, { displayName });
  }
  return cred;
};

export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
