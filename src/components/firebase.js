import firebase from 'firebase'

firebase.initializeApp ({
    apiKey: "AIzaSyDY62ii4ZDXRjc3rpdlEWqv09tWrYMuhR4",
    authDomain: "slackme-app.firebaseapp.com",
    projectId: "slackme-app",
    storageBucket: "slackme-app.appspot.com",
    messagingSenderId: "957368632074",
    appId: "1:957368632074:web:a99b436f150bac6e6130f3",
    measurementId: "G-K4TYKTCWQG"

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
