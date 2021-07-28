import React, { useState, useEffect, createContext, useContext } from 'react';
import { firebaseApp } from './firebase';  
import firebase from 'firebase/app';
import { Redirect, Route } from 'react-router-dom';  

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';


const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export function AuthenticatedRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        ) : (
         children
        )
      }
    />
  );
}
 
 
export function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ?  (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const Auth = () => {
  const [user, setUser] = useState(null);  
  const [error,setError] = useState(false); 
  const [open, setOpen] = useState(false);

  const signup = (name, email, password, url) => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebaseApp
          .auth()
          .currentUser.updateProfile({
            displayName: name,
            photoURL: url,
          })
          .then(() => {
            setUser(res.user);
            // alert('Sign up successfully completed!');
            const success = 'Sign up successfully completed!'; 
            setError(success) 
            setOpen(true)   
             window.location.replace('/');
          });
      })
      .catch((error) =>{
        setError(error.message);
        setOpen(true);  
      });
  };
 
  const login = (email, password) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res.user);
        const success = 'Login Successful!'; 
        setError(success) 
        setOpen(true)  
        window.location.replace('/'); 
      })
      .catch((error) => {   
        setError(error.message);
        setOpen(true);   
      }); 
  };

  const logout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then((res) => {
        setUser(null);
        window.location.replace('/login');
      })
      .catch((error) => alert(error.message));
  };
    

  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
        setUser(usr);
      }  
    });
  }, []);
   
  return {
    signup,
    user,
    login,
    logout,
    error, 
    open,
    setOpen
  };
};
export default Auth;