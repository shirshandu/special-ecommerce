import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC95r2Va6YYCPrCKHEWWg3ucXOJY6hCCIw",
  authDomain: "shirshandu-estore.firebaseapp.com",
  databaseURL: "https://shirshandu-estore.firebaseio.com",
  projectId: "shirshandu-estore",
  storageBucket: "shirshandu-estore.appspot.com",
  messagingSenderId: "947341910768",
  appId: "1:947341910768:web:5cf72bbdde7512b9565835",
};

// export const createUserProfileDocument =  aysnc (userAuth, additionalData) => {

// };

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
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

// const config = {
//   apiKey: "AIzaSyBf1AJB7wEh3VEn8FgJnKNEC473GJ6_OMs",
//   authDomain: "estore-db-850ec.firebaseapp.com",
//   databaseURL: "https://estore-db-850ec.firebaseio.com",
//   projectId: "estore-db-850ec",
//   storageBucket: "estore-db-850ec.appspot.com",
//   messagingSenderId: "182825468128",
//   appId: "1:182825468128:web:2a9db2a2c80e79b1215085",
// };

// firebase.initializeApp(config);

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// const provider = new firebase.auth.GithubAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

// export default firebase;
