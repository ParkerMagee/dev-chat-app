import React from "react"
import { logout } from "./firebase"

function Logout() {
    return (
        <div className="logout-page">
            <button type="submit" id="btnLogout" onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Logout
