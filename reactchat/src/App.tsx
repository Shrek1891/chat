import Home from "./pages/Home.tsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import createMuiTheme from "./theme/theme.tsx";
import Explorer from "./pages/Explorer.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home/>}/>
            <Route path="/explore/:categoryName" element={<Explorer/>}/>
        </Route>
    )
)


function App() {
    const theme = createMuiTheme();
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>

    )
}

export default App
