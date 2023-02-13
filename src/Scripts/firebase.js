import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyB2CjTRZSWRVbk7FzN8xXfOJ3wgQud1uys",
    authDomain: "developer-chat-app-5439d.firebaseapp.com",
    projectId: "developer-chat-app-5439d",
    storageBucket: "developer-chat-app-5439d.appspot.com",
    messagingSenderId: "644889898605",
    appId: "1:644889898605:web:d7bfee9dd6da4c040b9964",
    measurementId: "G-GW5PQ5KZRB",
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const database = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
