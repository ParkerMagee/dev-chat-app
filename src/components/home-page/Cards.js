import { useContext, useEffect, useState } from "react"
import "../../Styles/Cards.scss"
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
} from "firebase/firestore"
import { Add } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { AuthContext } from "../../contexts/AuthContext"

const Cards = () => {
    const [people, setPeople] = useState([])
    const [user, setUser] = useState(null)

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const getData = async () => {
            const q = query(collection(database, "users"))

            setPeople([])

            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setPeople((people) => [...people, doc.data()])
            })
        }
        return () => {
            getData()
        }
    }, [])

    useEffect(() => {
        const handleSelect = async () => {
            // check if the group(chats in firestore) already exists, if not create new one
            const combinedId =
                currentUser.uid > user[1].uid
                    ? currentUser.uid + user[1].uid
                    : user[1].uid + currentUser.uid
            try {
                const res = await getDoc(doc(database, "chats", combinedId))

                if (!res.exists()) {
                    // create chat in chats collection
                    await setDoc(doc(database, "chats", combinedId), { messages: [] })

                    // create user chats
                    await updateDoc(doc(database, "userChats", currentUser.uid), {
                        [combinedId + ".userInfo"]: {
                            uid: user[1].uid,
                            displayName: user[1].displayName,
                            photoURL: user[1].photoURL,
                        },
                        [combinedId + ".date"]: serverTimestamp(),
                    })
                    await updateDoc(doc(database, "userChats", user[1].uid), {
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
        }

        if (user !== null) {
            console.log("adding new user to chats")
            handleSelect()
        } else {
            console.log("user arr is currently null")
        }
    }, [user, currentUser.uid, currentUser.displayName, currentUser.photoURL])

    // Add selected user to list of chats
    const addChat = async (key) => {
        await Object.entries(people)?.forEach(async (person) => {
            if (person[1].uid === key) {
                await setUser(person)
            } else {
                console.log("checking next user...")
            }
        })
    }

    return (
        <div className="cards">
            <div className="cards__cardContainer">
                {Object.entries(people)?.map((person) => {
                    const key = person[1].uid
                    return (
                        <div className="cards__individualCards" key={key}>
                            <div className="upperSection">
                                <img src={person[1].photoURL} alt="" />
                                <h3>{person[1].displayName}</h3>
                            </div>
                            <div className="lowerSection">
                                {person[1].bio ? <p>{person[1].bio}</p> : <p>No user bio</p>}
                                {person[1].gitHub ? (
                                    <a href={person[1].gitHub}>{person[1].gitHub}</a>
                                ) : (
                                    <p>No user GitHub</p>
                                )}
                            </div>
                            <div className="popUp">
                                <IconButton key={key} onClick={() => addChat(key)}>
                                    <Add className="addButton" />
                                </IconButton>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Cards
