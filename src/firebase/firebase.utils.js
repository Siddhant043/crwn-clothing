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

export  const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; //if the user is not present
    const userRef = firestore.doc(`users/${userAuth.uid}`); // At this particular location we saved aur data or not 
    const snapShot = await userRef.get(); // gives back all the data
    if(!snapShot.exists){   // if exists is false then not saved.
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        // setting the data in database 
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message)
        }
    } 
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account '});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;