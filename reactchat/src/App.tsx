import Home from "./pages/Home.tsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Explorer from "./pages/Explorer.tsx";
import ToggleColorMode from "./componets/ToggleColorMode.tsx";
import Server from "./pages/Server.tsx";
import Login from "./pages/Login.tsx";
import {AuthContextProvider} from "./context/AuthContext.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home/>}/>
            <Route path="/server/:serverId?/:channelId?" element={<Server/>}/>
            <Route path="/explore/:categoryName" element={<Explorer/>}/>
            <Route path="/login" element={<Login/>}/>
        </Route>
    )
);


function App() {
    return (
        <AuthContextProvider>
            <ToggleColorMode>
                <RouterProvider router={router}/>
            </ToggleColorMode>
        </AuthContextProvider>

    )
}

export default App
