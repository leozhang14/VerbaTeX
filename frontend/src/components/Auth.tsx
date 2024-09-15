import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const signUp = async (email: string, password: string, navigate: (path: string) => void) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    navigate('/recents')
    console.log("User signed up:", userCredential.user);
  } catch (error) {
    console.error("Error signing up:", error);
    alert(error);
  }
};

export const login = async (email: string, password: string, navigate: (path: string) => void) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    navigate('/recents')
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const logout = async (navigate: (path: string) => void) => {
  await signOut(auth);
  navigate('/')
  console.log("User logged out");
};
