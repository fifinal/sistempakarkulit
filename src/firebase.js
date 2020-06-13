import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'
// Initialize Firebase
// Please use your own configue info
const config = {
  apiKey: "AIzaSyCeGUB3Ru0praQxGvDdwfaKjozjQUvqlZU",
  authDomain: "sistem-pakar-kulit.firebaseapp.com",
  databaseURL: "https://sistem-pakar-kulit.firebaseio.com",
  projectId: "sistem-pakar-kulit",
  storageBucket: "sistem-pakar-kulit.appspot.com",
  messagingSenderId: "670219088963",
  appId: "1:670219088963:web:1f1f7afa550c4860eb10f6",
  measurementId: "G-FLXPJ4BL08"
};

const fb = firebase.initializeApp(config);

const db = firebase.firestore();

export {
  fb,
  db
}
