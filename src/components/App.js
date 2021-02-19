import styles from './App.css'
import React, { useState, Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { auth, provider } from './firebase';
import firestore from './firebase';

import Signin from './Signin'
import Signout from './Signout'
import SlackHome from './SlackHome'
import { Router } from "@reach/router";
import SignUp from "./SignUp";





function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <section>

          {user ? <SlackHome/> :
        <Router>
          <SignUp path="SignUp" />
          <Signin path="/" />
        </Router>

          }
      </section>

    </div>
  );
}

export default App;
