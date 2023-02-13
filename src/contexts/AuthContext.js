import React, { useState, useEffect } from "react"
import { auth } from "../Scripts/firebase.js"
import { onAuthStateChanged } from "firebase/auth"

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            console.log(user)
        })
        return () => {
            unsub()
        }
    }, [])

    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
}
