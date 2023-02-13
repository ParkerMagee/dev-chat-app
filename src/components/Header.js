import React from "react"
import "../Styles/Header.scss"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import ChatIcon from "@mui/icons-material/Chat"
import { IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import { PersonAddAlt1 } from "@mui/icons-material"

function Header() {
    return (
        <div className="header">
            <Link to="/profile">
                <IconButton>
                    <AccountBoxIcon className="header__icon" fontSize="large" />
                </IconButton>
            </Link>

            <Link to="/home">
                <IconButton>
                    <PersonAddAlt1 className="header__logo" fontSize="large" />
                </IconButton>
            </Link>
            <Link to="/chats">
                <IconButton>
                    <ChatIcon className="header__icon" fontSize="large" />
                </IconButton>
            </Link>
        </div>
    )
}

export default Header
