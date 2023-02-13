import React from "react"
import MainChat from "../components/chat-page/MainChat"
import Sidebar from "../components/chat-page/Sidebar"
import Header from "../components/Header"
import "../Styles/ChatPage.scss"

function ChatPage() {
    return (
        <div className="chatPage">
            <Header backButton="/" />
            <div className="chat-page">
                <div className="container">
                    <Sidebar />
                    <MainChat />
                </div>
            </div>
        </div>
    )
}

export default ChatPage
