import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBblxfSFezMCUrymXI7U6pREAQpJySoh9c",
  authDomain: "shopily-ecommerce.firebaseapp.com",
  projectId: "shopily-ecommerce",
  storageBucket: "shopily-ecommerce.appspot.com",
  messagingSenderId: "709704644222",
  appId: "1:709704644222:web:0d4bc7af902916066f0a2f",
  measurementId: "G-GVNMQMM8QM",
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const database = firebase.database();

export { firestore, auth, storage, database };
export default firebase;
