import React, { useState, useEffect } from 'react';
import Login from '../../components/Login';
import Logout from '../../components/Logout';
import SignUp from '../../components/Signup';
import { auth } from '../../firebase';
import verbatex from '../../assets/verbatex.png';
import example from '../../assets/example.png';
import latex from '../../assets/latex.png';

const HomePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-screen h-screen bg-white relative overflow-x-hidden">
      <header className="absolute top-0 left-0 w-full flex justify-between items-start p-4">
        <div className="pl-4">
          <img src={verbatex} alt="Verbatex Logo" className="h-12" />
        </div>
        <div className="flex flex-col pr-4">
          {user ? (
            <Logout />
          ) : (
            <>
              <SignUp />
              <Login />
            </>
          )}
        </div>
      </header>

      <div className="flex h-full max-w-full pt-24">
        <div className="w-1/2 flex flex-col justify-center items-start pl-16 space-y-6">
          <h1 className="text-5xl font-bold flex items-center">
            The easiest way to use 
            <img src={latex} alt="Latex" className="w-36 h-auto mx-4 align-middle" />
          </h1>
          <h2 className="text-xl text-gray-500 flex items-center">
            Go from speech to text to 
            <img src={latex} alt="Latex" className="w-20 h-auto mx-4 align-middle" />
            in seconds
          </h2>
        </div>

        <div className="w-1/2 flex items-center justify-center pr-16 pl-16">
          <img src={example} alt="Example Image" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
