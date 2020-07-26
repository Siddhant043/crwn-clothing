import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBxcr3tXIJ4A5adMMWCpU2VSkUFunQFUxs",
    authDomain: "crwn-clothing-aa008.firebaseapp.com",
    databaseURL: "https://crwn-clothing-aa008.firebaseio.com",
    projectId: "crwn-clothing-aa008",
    storageBucket: "crwn-clothing-aa008.appspot.com",
    messagingSenderId: "1098515913857",
    appId: "1:1098515913857:web:883e090deb7eba7a2a0180"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account '});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;