import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const saveEquation = async (userId: string, equation: string) => {
  try {
    await addDoc(collection(db, "equations"), {
      userId,
      equation,
      timestamp: new Date(),
    });
    console.log("Equation saved!");
  } catch (error) {
    console.error("Error saving equation:", error);
  }
};

export const fetchEquations = async (userId: string) => {
  const q = query(collection(db, "equations"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const equations = querySnapshot.docs.map(doc => doc.data());
  console.log("User's equations:", equations);
  return equations;
};
