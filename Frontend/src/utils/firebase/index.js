import firebase from "firebase/app";
import "firebase/storage";

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCTApaSy5xVtOK3-j9IklcgkZz_EyZamwM",
    authDomain: "masterfinalproject-4583d.firebaseapp.com",
    databaseURL: "https://masterfinalproject-4583d.firebaseio.com",
    projectId: "masterfinalproject-4583d",
    storageBucket: "masterfinalproject-4583d.appspot.com",
    messagingSenderId: "547788183095",
    appId: "1:547788183095:web:15359e41f796cd219651b2",
    measurementId: "G-X4YLKY1QYQ"
};


firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};