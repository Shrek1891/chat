import type {Server} from "../../@types/server";
import {
    AppBar,
    Typography,
    Toolbar,
    ListItemAvatar,
    Avatar,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useParams} from "react-router-dom";
import {MEDIA_URL} from "../../config.ts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExploreCategories from "../SecondaryDraw/ExploreCategories.tsx";
import ServerChanell from "../SecondaryDraw/ServerChanell.tsx";
import {useEffect, useState} from "react";
import {useMediaQuery} from "@mui/material";
import JoinServerButton from "../JoinServerButton.tsx";


const MessageInterfaceChannels = ({data}: { data: Server[] }) => {
    const theme = useTheme();
    const {serverId, channelId} = useParams()
    const [sideMenu, setSideMenu] = useState(false);
    const channelName = data
        ?.find((server) => server.id === Number(serverId))
        ?.chanel_server?.find((channel) => channel.id === Number(channelId))?.name
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {
        if (isSmallScreen) {
            setSideMenu(false);
        }
    }, [isSmallScreen]);
    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }
            setSideMenu(open);
        };

    const list = () => (
        <Box
            sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth: "200px"}}
            role="presentation" onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <ServerChanell data={data}/>
        </Box>
    )

    return (<div>
        <AppBar
            sx={{
                backgroundColor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
            color="default"
            position="sticky"
            elevation={0}
        >
            <Toolbar
                variant="dense"
                sx={{
                    height: theme.primaryAppBar.height,
                    minHeight: theme.primaryAppBar.height,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Box sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                    },
                    alignItems: "center",
                }}>
                    <ListItemAvatar
                        sx={{minWidth: "40px"}}
                    >
                        <Avatar
                            alt="server icon"
                            src={`${MEDIA_URL}${data?.[0]?.icon}`}
                            sx={{width: "30px", height: "30px"}}
                        />
                    </ListItemAvatar>
                </Box>
                <Typography
                    noWrap
                    component="div"
                >
                    {channelName}
                </Typography>
                <Box sx={{flexGrow: 1}}></Box>
                <JoinServerButton/>
                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
                        <MoreVertIcon/>
                    </IconButton>
                </Box>
                <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>

            </Toolbar>


        </AppBar>
    </div>);
};

export default MessageInterfaceChannels;
