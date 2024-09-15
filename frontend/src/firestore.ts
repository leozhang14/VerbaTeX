import { db } from './firebase';
import { collection, addDoc, getDocs, query, doc, deleteDoc, updateDoc } from "firebase/firestore";

// TODO optional field latex and image to be added
export const saveEquation = async (userId: string, equation: string, liked: boolean, latex?: string, img?: string): Promise<string> => {
    try {
        const collectionPath = liked ? `users/${userId}/favourites` : `users/${userId}/recents`;
        const docRef = await addDoc(collection(db, collectionPath), {
            equation,
            timestamp: new Date(),
            latex: latex || "",
            img: img || "" 
        });

        console.log("Equation saved with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error saving equation:", error);
        throw error;
    }
};


export const updateEquationWithLatexAndImage = async (userId: string, equationId: string, latex: string, img: string) => {
    try {
        const equationRef = doc(db, `users/${userId}/recents/${equationId}`);
        await updateDoc(equationRef, { latex, img });
        console.log("Equation updated with LaTeX and image");
    } catch (error) {
        console.error("Error updating equation with LaTeX and image:", error);
    }
  };


// TODO add fetch field latex code and img
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
        const favouritesDocRef = doc(db, `users/${userId}/favourites`, equationId);
        await updateDoc(favouritesDocRef, { equation: newEquation });
    
        console.log("Equation updated successfully");
    } catch (error) {
        console.error("Error updating equation:", error);
    }
};
