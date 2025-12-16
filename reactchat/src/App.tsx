import Home from "./pages/Home.tsx";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import Explorer from "./pages/Explorer.tsx";
import ToggleColorMode from "./componets/ToggleColorMode.tsx";
import Server from "./pages/Server.tsx";
import Login from "./pages/Login.tsx";
import {AuthContextProvider} from "./context/AuthContext.tsx";
import TestLogin from "./pages/TestLogin.tsx";
import ProtectedRoute from "./services/ProtectedRoute.tsx";
import Register from "./pages/Register.tsx";


function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <ToggleColorMode>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/server/:serverId?/:channelId?" element={
                            <ProtectedRoute>
                                <Server/>
                            </ProtectedRoute>

                        }/>
                        <Route path="/explore/:categoryName" element={<Explorer/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/test-login" element={
                            <ProtectedRoute>
                                <TestLogin/>
                            </ProtectedRoute>
                        }/>
                    </Routes>
                </ToggleColorMode>
            </AuthContextProvider>
        </BrowserRouter>

    )
}

export default App
