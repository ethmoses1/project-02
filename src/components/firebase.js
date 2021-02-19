import firebase from 'firebase'

firebase.initializeApp ({
  apiKey: "AIzaSyAlMC-Zi3tVth1u9jfPYjJHiKaW0gLap4g",
  authDomain: "project-02-4262c.firebaseapp.com",
  projectId: "project-02-4262c",
  storageBucket: "project-02-4262c.appspot.com",
  messagingSenderId: "368304647730",
  appId: "1:368304647730:web:43f2f6c6646ed4af85162b",
  measurementId: "G-G17HJFZDTC"

})

const auth = firebase.auth();
const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export default firestore;
export { auth, provider };


export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const channelRef = firestore.collection('channels').doc('channel')
                .collection('messages').doc('message');

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
      await channelRef.set({

      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    const documents = await firestore.doc(`channels/${uid}`).collection('messages').doc('message').get();

    return {
      uid,
      ...userDocument.data(),
      uid,
      ...documents.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
