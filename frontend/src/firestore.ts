import { db } from './firebase';
import { collection, addDoc, getDocs, query, doc, deleteDoc } from "firebase/firestore";

export const saveEquation = async (userId: string, equation: string, liked: boolean) => {
  try {
    await addDoc(collection(db, `users/${userId}/recents`), {
      equation,
      timestamp: new Date(),
    });

    if (liked) {
      await addDoc(collection(db, `users/${userId}/favourites`), {
        equation,
        timestamp: new Date(),
      });
    }

    console.log("Equation saved!");
  } catch (error) {
    console.error("Error saving equation:", error);
  }
};

export const fetchEquations = async (userId: string, liked: boolean) => {
  let collectionPath = `users/${userId}/recents`;

  if (liked) {
    collectionPath = `users/${userId}/favourites`;
  }

  const q = query(collection(db, collectionPath));
  const querySnapshot = await getDocs(q);
  const equations = querySnapshot.docs.map(doc => doc.data());
  console.log("Fetched equations:", equations);
  return equations;
};

export const removeFromFavourites = async (userId: string, equationId: string) => {
  try {
    await deleteDoc(doc(db, `users/${userId}/favourites`, equationId));
    console.log("Equation removed from favourites!");
  } catch (error) {
    console.error("Error removing equation from favourites:", error);
  }
};

export const removeFromRecents = async (userId: string, equationId: string) => {
  try {
    await deleteDoc(doc(db, `users/${userId}/recents`, equationId));
    console.log("Equation removed from recents!");
  } catch (error) {
    console.error("Error removing equation from recents:", error);
  }
};
