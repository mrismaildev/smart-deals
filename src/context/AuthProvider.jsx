import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../utils/firebase.config';
import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log('current user', currentUser);

      if (currentUser) {
        const loggedUser = { email: currentUser.email };
        fetch('http://localhost:3000/jwt-token', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(loggedUser),
        })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem('access-token', data.token);
            console.log('after getting token', data);
            setLoading(false);
          });
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInGoogle,
    signOutUser,
    setLoading,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
