import React, { useContext } from "react"
import Messages from "./Messages"
import Inputs from "./Inputs"
import { ChatContext } from "../../contexts/ChatContext"

function MainChat() {
    const { data } = useContext(ChatContext)

    return (
        <div className="main-chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
            </div>
            <Messages />
            <Inputs />
        </div>
    )
}

export default MainChat
