import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import PopularChannels from "../componets/PrimaryDraw/PopularChannels.tsx";
import ExploreCategories from "../componets/SecondaryDraw/ExploreCategories.tsx";
import ExploreServer from "../componets/Main/ExploreServer.tsx";

const Home = () => {
    return (
        <Box sx={{display: "flex"}}>
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
    );
};
export default Home;
