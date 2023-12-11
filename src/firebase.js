import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDkm_pw2kGzze_T800gJYq2HMUYnY49Qx4",
  authDomain: "orderease-76588.firebaseapp.com",
  databaseURL: "https://orderease-76588-default-rtdb.firebaseio.com",
  projectId: "orderease-76588",
  storageBucket: "orderease-76588.appspot.com",
  messagingSenderId: "625191016976",
  appId: "1:625191016976:web:a06ee20338f6089c6dc895",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();

export { db };
