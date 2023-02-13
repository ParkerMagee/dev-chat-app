import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../Styles/Login.scss"
import { onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { database, auth, storage } from "./firebase"
import { doc, setDoc } from "firebase/firestore"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

function SignUp() {
    const navigate = useNavigate()
    const [err, setErr] = useState(false)

    const createAccount = async () => {
        const loginEmail = document.getElementById("txtEmail").value
        const loginPassword = document.getElementById("txtPassword").value
        const displayName = document.getElementById("txtDisplayName").value
        const profilePicture = document.getElementById("imgProfilePicture").files[0]
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            )

            console.log(userCredential.user)

            const storageRef = await ref(storage, loginEmail)

            try {
                uploadBytesResumable(storageRef, profilePicture).then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateProfile(userCredential.user, {
                            displayName,
                            photoURL: downloadURL,
                        })
                        console.log("photo uploaded")
                        await setDoc(doc(database, "users", userCredential.user.uid), {
                            uid: userCredential.user.uid,
                            displayName,
                            userEmail: loginEmail,
                            photoURL: downloadURL,
                            bio: null,
                            gitHub: null,
                        })
                        await setDoc(doc(database, "userChats", userCredential.user.uid), {})
                        console.log("user info uploaded")

                        navigate("/home")
                    })
                })
            } catch (error) {
                console.log(error)
            }
        } catch (err) {
            setErr(true)
        }
    }

    const signUpAction = () => {
        createAccount()
    }

    useEffect(() => {
        const monitorAuthState = async () => {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    navigate("/home")
                }
            })
        }
        return () => {
            monitorAuthState()
        }
    }, [navigate])

    return (
        <div className="login-page">
            <div className="login-form signup-form">
                <h3 className="login-header">Sign Up for an Account</h3>

                <div className="login-displayName">
                    <label>Enter a User Name</label>
                    <input
                        type="text"
                        placeholder="User Name"
                        name="displayName"
                        id="txtDisplayName"
                        required
                    />
                </div>

                <div className="login-email">
                    <label>Enter Your Email Address</label>
                    <input type="text" placeholder="Email" name="email" id="txtEmail" required />
                </div>

                <div className="login-password">
                    <label>Enter a Password</label>
                    <input
                        type="text"
                        placeholder="Password"
                        name="pass"
                        id="txtPassword"
                        required
                    />
                </div>

                <div className="profile-picture">
                    <label htmlFor="imgProfilePicture">
                        <AddPhotoAlternateIcon fontSize="large" />
                        <span>Add a Profile Picture</span>
                    </label>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="imgProfilePicture"
                        required
                    />
                </div>

                {err && <span>Invalid email or password.</span>}

                <button className="login-btn" type="submit" id="btnSignUp" onClick={signUpAction}>
                    Sign Up
                </button>

                <div className="login-signup">
                    <p>Already have an account?</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <h4 className="redirect-link">Login</h4>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
