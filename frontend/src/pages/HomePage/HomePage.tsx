import React, { useState, useEffect } from 'react';
import Login from '../../components/Login';
import Logout from '../../components/Logout';
import SignUp from '../../components/Signup';
import { auth } from '../../firebase';

const HomePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.email}</h1>
          <Logout />
        </>
      ) : (
        <>
          <Login />
          <SignUp />
        </>
      )}
    </div>
  );
};

export default HomePage;

