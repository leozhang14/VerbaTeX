import { db } from './firebase';
import { collection, addDoc, getDocs, query, doc, deleteDoc, updateDoc } from "firebase/firestore";

export const saveEquation = async (userId: string, equation: string, liked: boolean) => {
  try {
    if (liked) {
        await addDoc(collection(db, `users/${userId}/favourites`), {
            equation,
            timestamp: new Date(),
        });
    } else {
        await addDoc(collection(db, `users/${userId}/recents`), {
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
  const equations = querySnapshot.docs.map(doc => {
    const data = doc.data();
    console.log("Document data:", data);

    return {
      id: doc.id,
      functionType: data.functionType || "Unknown",
      function: data.equation || "Empty"
    };
  });
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

export const editEquation = async (userId: string, equationId: string, newEquation: string) => {
    try {
        const recentsDocRef = doc(db, `users/${userId}/recents`, equationId);
        await updateDoc(recentsDocRef, { equation: newEquation });
    
        const favouritesDocRef = doc(db, `users/${userId}/favourites`, equationId);
        await updateDoc(favouritesDocRef, { equation: newEquation });
    
        console.log("Equation updated successfully");
    } catch (error) {
        console.error("Error updating equation:", error);
    }
};
