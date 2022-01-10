import firebase from "firebase/app";
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZXeiXllAwbcRbhcVttdqagHAjat4FjVY",
    authDomain: "crud-firestore-e5f0f.firebaseapp.com",
    projectId: "crud-firestore-e5f0f",
    storageBucket: "crud-firestore-e5f0f.appspot.com",
    messagingSenderId: "481249011856",
    appId: "1:481249011856:web:af86b97ebeac9eab9c9015"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {firebase}