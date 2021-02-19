import React, { useState, Component } from 'react';
import { Link } from "@reach/router";
import firebase from 'firebase/app';

import { auth, provider } from './firebase';
import firestore from './firebase';

import './Signin.css'





function Signin () {
    const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }


  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
      };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

return(
  <div>
  <div className="login">
    <div className="login__container">

              <div className="border border-blue-400 mx-auto w-1000 md:w-1000 rounded py-8 px-4 md:px-8">
    {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
    <img src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"
       				/>

      <label htmlFor="userPassword" className="block">
        Email:
      </label>
      <input
        type="email"
        className="my-1 p-1 w-full"
        name="userEmail"
        value = {email}
        placeholder="E.g: faruq123@gmail.com"
        id="userEmail"
        onChange = {(event) => onChangeHandler(event)}
      />
      <label htmlFor="userPassword" className="block">
        Password:
      </label>
      <input
        type="password"
        className="mt-1 mb-3 p-1 w-full"
        name="userPassword"
        value = {password}
        placeholder="Your Password"
        id="userPassword"
        onChange = {(event) => onChangeHandler(event)}
      />
      <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
        Sign in
      </button>

    <p className="text-center my-3">or</p>
    <button
      className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      Sign in with Google
    </button>
    <p className="text-center my-3">
      Don't have an account?{" "}
      <Link to="SignUp" className="text-blue-500 hover:text-blue-600">
        Sign up here
      </Link>{" "}
      <br />{" "}
      <Link to="passwordReset" className="text-blue-500 hover:text-blue-600">
        Forgot Password?
      </Link>
    </p>
  </div>
</div>
</div>
</div>
 )
}

export default Signin
