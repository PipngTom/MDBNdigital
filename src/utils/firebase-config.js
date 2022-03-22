import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "mbndigital-app.firebaseapp.com",
    projectId: "mbndigital-app",
    storageBucket: "mbndigital-app.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

export const app = initializeApp(firebaseConfig)

export const storage = getStorage()


export const auth = getAuth(app)

