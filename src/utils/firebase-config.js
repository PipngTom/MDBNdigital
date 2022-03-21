import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCwNQSW5RSDDFYMHWbbduU3N05vnw27fcQ",
    authDomain: "mbndigital-app.firebaseapp.com",
    projectId: "mbndigital-app",
    storageBucket: "mbndigital-app.appspot.com",
    messagingSenderId: "1080719031634",
    appId: "1:1080719031634:web:8ce653757e2b93feb4ce8b",
    measurementId: "G-5G4KVS5MFZ"
  };

export const app = initializeApp(firebaseConfig)

export const storage = getStorage()


export const auth = getAuth(app)

