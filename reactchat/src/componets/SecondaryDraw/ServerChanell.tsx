import useCrud from "../../hooks/useCrud.ts";
import {useEffect} from "react";
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Link, useParams} from "react-router-dom";
import {MEDIA_URL} from "../../config.ts";
import type {Server} from "../../@types/server";

interface ServerChannels {
    data: Server[]
}

const ServerChannell = ({data}: ServerChannels) => {
    const theme = useTheme()
    const {serverId} = useParams()
    const server_name = data?.[0]?.name ?? "Server"
    const isDarkMode = theme.palette.mode === "dark"
    return (
        <>
            <Box sx={{
                height: "50px",
                px: 2,
                display: "flex",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.divider}`,
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: theme.palette.background.default,

            }}>
                <Typography
                    variant="body1"
                    style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {server_name}
                </Typography>
            </Box>
            <List>
                {
                    data?.flatMap((obj) => (
                        obj.chanel_server.map((category) => (
                            <ListItem
                                key={category.id}
                                disablePadding dense={true}
                                sx={{
                                    display: "block",
                                }}
                            >
                                <Link
                                    to={`/server/${serverId}/${category.id}`}
                                    style={{textDecoration: "none", color: "inherit"}}
                                >
                                    <ListItemButton sx={{minHeight: 48}}>
                                        <ListItemText
                                            primary={<Typography paddingLeft={2} variant="body2"
                                                                 noWrap>{category.name}</Typography>}
                                            secondary={<Typography variant="body2" paddingLeft={2}
                                                                   noWrap>{category.topic}</Typography>}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))
                    ))}

            </List>
        </>
    )
}

export default ServerChannell