import React, { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

function NavBar() {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className="navbar">
            <span className="logo">Test Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
            </div>
        </div>
    )
}

export default NavBar
