import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAjlvI-DbsEf6R46eMlf2UL7BdSa-lQiFg",
  authDomain: "shop-cdf8d.firebaseapp.com",
  databaseURL: "https://shop-cdf8d.firebaseio.com",
  projectId: "shop-cdf8d",
  storageBucket: "shop-cdf8d.appspot.com",
  messagingSenderId: "422474450385",
  appId: "1:422474450385:web:a1c9bbf09d1c0ad5e8ccf0"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user ', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
