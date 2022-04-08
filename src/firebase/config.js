import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDXrksWlhOGEAKdQO7Hv5nYWh_RiD7EVn8",
  authDomain: "playlist-project-2dcf5.firebaseapp.com",
  projectId: "playlist-project-2dcf5",
  storageBucket: "playlist-project-2dcf5.appspot.com",
  messagingSenderId: "116557053656",
  appId: "1:116557053656:web:f7ffd00df236abbf3ca1ad",
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp}