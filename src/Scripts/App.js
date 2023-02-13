import React, { useContext } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from "./HomePage"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ChatPage from "./ChatPage"
import Login from "./Login"
import SignUp from "./SignUp"
import ProfilePage from "./ProfilePage"
import { AuthContext } from "../contexts/AuthContext"

function App() {
    const { currentUser } = useContext(AuthContext)

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/" />
        }

        return children
    }

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/">
                        {/* Login */}
                        <Route index element={<Login />} />
                        {/* Sign Up */}
                        <Route path="sign-up" element={<SignUp />} />

                        {/* Header */}
                        {/* Cards */}
                        {/* Footer */}
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute>
                                    <HomePage />
                                </ProtectedRoute>
                            }
                        />

                        {/* Messaging Home Screen */}
                        <Route
                            path="chats"
                            element={
                                <ProtectedRoute>
                                    <ChatPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* Your Profile Page */}
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
