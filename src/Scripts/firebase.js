import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAz472879-5fLzLoTxLVLY_byRLJZDw750",
    authDomain: "entrepreneur-app-773a1.firebaseapp.com",
    projectId: "entrepreneur-app-773a1",
    storageBucket: "entrepreneur-app-773a1.appspot.com",
    messagingSenderId: "298254566686",
    appId: "1:298254566686:web:a20a5a1c8a58b7bde8f50f",
    measurementId: "G-DRWTP2W1XW",
}

export const firebaseApp = initializeApp(firebaseConfig)
export const database = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)
