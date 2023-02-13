import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../Styles/Login.scss"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"

function Login() {
    const navigate = useNavigate()
    const [err, setErr] = useState(false)

    const loginEmailPassword = async () => {
        const loginEmail = document.getElementById("txtEmail").value
        const loginPassword = document.getElementById("txtPassword").value

        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(userCredential.user)
            navigate("/home")
        } catch (err) {
            setErr(true)
        }
    }

    const loginAction = () => {
        loginEmailPassword()
    }

    useEffect(() => {
        const monitorAuthState = async () => {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    navigate("/home")
                }
            })
        }
        monitorAuthState()
    }, [navigate])

    return (
        <div className="login-page">
            <div className="login-form">
                <h3 className="login-header">Login to Your Account</h3>
                <div className="login-email">
                    <label>Enter Your Email Address</label>
                    <input type="text" placeholder="Email" name="email" id="txtEmail" required />
                </div>

                <div className="login-password">
                    <label>Enter Your Password</label>
                    <input
                        type="text"
                        placeholder="Password"
                        name="pass"
                        id="txtPassword"
                        required
                    />
                </div>

                {err && <span>Incorrect email or password.</span>}

                <div className="login-section">
                    <button className="login-btn" type="submit" id="btnLogin" onClick={loginAction}>
                        Login
                    </button>
                </div>

                <div className="login-signup">
                    <p>Don't have an account?</p>
                    <Link to="/sign-up" style={{ textDecoration: "none" }}>
                        <h4 className="redirect-link">Sign Up</h4>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
