import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDnQA3dMGr6-LK2qoDk7L7Ltvm9W9L6vXE",
    authDomain: "uploaded-9719b.firebaseapp.com",
    databaseURL: "https://uploaded-9719b.firebaseio.com",
    projectId: "uploaded-9719b",
    storageBucket: "uploaded-9719b.appspot.com",
    messagingSenderId: "929396145480",
    appId: "1:929396145480:web:78172aa827a9b94ed2477d",
    measurementId: "G-13TJN9E9VM"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };