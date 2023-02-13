import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { auth, database, storage } from "../../Scripts/firebase"
import { signOut, updateProfile } from "firebase/auth"
import "../../Styles/Profile.scss"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

function ProfileSection() {
    const [userBio, setUserBio] = useState(null)
    const [userGitHub, setUserGitHub] = useState(null)

    const { currentUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const logout = async () => {
        await signOut(auth)
        navigate("/")
    }

    // Get user bio from firestore
    useEffect(() => {
        const getData = async () => {
            const docRef = doc(database, "users", currentUser.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setUserBio(docSnap.data().bio)
                setUserGitHub(docSnap.data().gitHub)
            } else {
                console.log("No bio found")
            }
        }
        return () => {
            getData()
        }
    }, [currentUser.uid])

    // Changes users display name
    const changeDisplayName = (e) => {
        e.code === "Enter" && updateDisplayName()
    }

    const updateDisplayName = async () => {
        const newDisplayName = document.getElementById("txtDisplayName").value

        await updateDoc(doc(database, "users", currentUser.uid), {
            displayName: newDisplayName,
        })

        await updateProfile(currentUser, {
            displayName: newDisplayName,
        })
            .then(() => {
                window.location.reload(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Changes users profile picture
    const updateProfilePicture = async (e) => {
        e.preventDefault()

        const newProfilePicture = document.getElementById("imgProfilePicture").files[0]

        const storageRef = ref(storage, currentUser.email)

        await deleteObject(storageRef)

        const uploadTask = uploadBytesResumable(storageRef, newProfilePicture)

        uploadTask.on(
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (downloadURL) => {
                        await updateProfile(currentUser, {
                            photoURL: downloadURL,
                        })
                        await updateDoc(doc(database, "users", currentUser.uid), {
                            photoURL: downloadURL,
                        })
                    })
                    .then(() => {
                        window.location.reload(false)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        )
    }

    // Update user bio
    const changeBio = (e) => {
        e.code === "Enter" && updateBio()
    }

    const updateBio = async () => {
        const newBio = document.getElementById("bioInput").value

        await updateDoc(doc(database, "users", currentUser.uid), {
            bio: newBio,
        })
            .then(() => {
                window.location.reload(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Update user GitHub link
    const changeGitHub = (e) => {
        e.code === "Enter" && updateGitHub()
    }

    const updateGitHub = async () => {
        const newGitHub = document.getElementById("gitHub").value

        await updateDoc(doc(database, "users", currentUser.uid), {
            gitHub: newGitHub,
        })
            .then(() => {
                window.location.reload(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="profileSection">
            <div className="currentInfo">
                <div className="upperSection">
                    <img className="backgroundImg" src={currentUser.photoURL} alt="" />
                    <div className="currentUserName">{currentUser.displayName}</div>
                </div>
                <div className="lowerSection">
                    {userBio ? (
                        <div className="currentBio">{userBio}</div>
                    ) : (
                        <div className="currentBio">No user bio</div>
                    )}
                    <div className="gitHub">
                        {userGitHub ? (
                            <a href={userGitHub}>{userGitHub}</a>
                        ) : (
                            <span>No user github</span>
                        )}
                    </div>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>

            <div className="infoFields">
                <h1>Profile</h1>
                <div className="name-img">
                    <div className="userName">
                        <input
                            type="text"
                            placeholder="Change User Name"
                            name="displayName"
                            id="txtDisplayName"
                            onKeyDown={changeDisplayName}
                        />
                    </div>
                    <div className="profilePicture">
                        <label className="img-background" htmlFor="imgProfilePicture">
                            <span>Change Profile Picture</span>
                        </label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="imgProfilePicture"
                            onChange={updateProfilePicture}
                        />
                    </div>
                </div>
                <div className="bio">
                    <label htmlFor="bioInput">
                        <span>Edit Bio</span>
                    </label>
                    <input
                        type="text"
                        placeholder={userBio ? userBio : "Enter bio here..."}
                        id="bioInput"
                        onKeyDown={changeBio}
                    />
                </div>
                <div className="linkGitHub">
                    <label htmlFor="gitHub">
                        <span>GitHub Link</span>
                    </label>
                    <input
                        type="text"
                        placeholder={userGitHub ? userGitHub : "Link your GitHub here..."}
                        id="gitHub"
                        onKeyDown={changeGitHub}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileSection
