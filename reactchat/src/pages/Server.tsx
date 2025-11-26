import {useNavigate, useParams} from "react-router-dom";
import useCrud from "../hooks/useCrud";
import type {Server} from "../@types/server";
import {
    Box,
    CssBaseline,
} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import UserServers from "../componets/PrimaryDraw/UserServers";
import MessageInterface from "../componets/Main/MessageInterface";
import {useEffect} from "react";
import ServerChanell from "../componets/SecondaryDraw/ServerChanell.tsx";


const Server = () => {
    const navigate = useNavigate();
    const {serverId, channelId} = useParams();
    const {data, error, loading, fetchData} = useCrud<Server>(
        [],
        `/server/select/?by_server_id=${serverId}`
    );

    if (error !== null && error.message === "400") {
        navigate("/");
        return null;
    }

    useEffect(() => {
        fetchData()
    }, []);
    // Check if the channelId is valid by searching for it in the data fetched from the API
    const isChannel = (): Boolean => {
        if (!channelId) {
            return true;
        }

        return [...data].some((server) =>
            server.chanel_server.some(
                (channel) => channel.id === parseInt(channelId)
            )
        );
    };
    useEffect(() => {
        if (!isChannel()) {
            navigate(`/server/${serverId}`);
        }
    }, [isChannel, channelId]);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            <PrimaryDraw>
                <UserServers open={false} data={data}/>
            </PrimaryDraw>
            <SecondaryDraw>
                <ServerChanell data={data}/>
            </SecondaryDraw>
            <Main>
                <MessageInterface data={data}/>
            </Main>
        </Box>
    );
};
export default Server;