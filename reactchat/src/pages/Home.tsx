import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";
import Main from "./templates/Main.tsx";
import PopularChannels from "../componets/PrimaryDraw/PopularChannels.tsx";
import ExploreCategories from "../componets/SecondaryDraw/ExploreCategories.tsx";
import ExploreServer from "../componets/Main/ExploreServer.tsx";


const Home = () => {
    return (
        <Box sx={{display: 'flex', width: '100vw'}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            <PrimaryDraw>
                <PopularChannels open={false}/>
            </PrimaryDraw>
            <SecondaryDraw>
                <ExploreCategories/>
            </SecondaryDraw>
            <Main>
                <ExploreServer/>
            </Main>
        </Box>
    )
}

export default Home
