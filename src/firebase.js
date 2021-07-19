import firebase from "firebase"

import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAeDiRFmchtMor16vt6DIjzMmkoH5WLseI",
    authDomain: "twitter-91230.firebaseapp.com",
    projectId: "twitter-91230",
    storageBucket: "twitter-91230.appspot.com",
    messagingSenderId: "68477955875",
    appId: "1:68477955875:web:4e01d293542932d647a696",
    measurementId: "G-GX56VEJGH7"
  }; 

 export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const storage = firebaseApp.storage();
  const db = firebaseApp.firestore();
   
  export default  db;