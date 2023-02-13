import React, { useContext, useState } from "react"
import { database } from "../../Scripts/firebase"
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore"
import { AuthContext } from "../../contexts/AuthContext"

function Search() {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const { currentUser } = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(collection(database, "users"), where("displayName", "==", username))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
        } catch (err) {
            setErr(true)
        }
    }
    // When users enter a name in the search bar, handleSearch is called
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch()
    }
    const handleSelect = async () => {
        // check if the group(chats in firestore) already exists, if not create new one
        const combinedId =
            currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        try {
            const res = await getDoc(doc(database, "chats", combinedId))

            if (!res.exists()) {
                // create chat in chats collection
                await setDoc(doc(database, "chats", combinedId), { messages: [] })

                // create user chats
                await updateDoc(doc(database, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                })
                await updateDoc(doc(database, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                })
            }
        } catch (err) {}
        setUser(null)
        setUsername("")
    }
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Search for users"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {err && <span>No users found</span>}
            {user && (
                <div className="userChat" onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Search
