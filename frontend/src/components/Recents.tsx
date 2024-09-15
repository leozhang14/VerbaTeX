import React, { useState, useEffect } from 'react';
import { fetchEquations } from '../firestore';
import { auth } from '../firebase';

const Equations = () => {
  const [equations, setEquations] = useState<any[]>([]);

  useEffect(() => {
    const loadEquations = async () => {
      if (auth.currentUser) {
        const userEquations = await fetchEquations(auth.currentUser.uid, false);
        setEquations(userEquations);
      }
    };
    loadEquations();
  }, []);

  return (
    <div>
      <h2>Your Favourite Equations</h2>
      <ul>
        {equations.map((eq, index) => (
          <li key={index}>{eq.equation}</li>
        ))}
      </ul>
    </div>
  );
};

export default Equations;
