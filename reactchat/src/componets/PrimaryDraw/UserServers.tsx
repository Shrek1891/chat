import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemAvatar,
    Avatar,
    ListItemButton,
} from "@mui/material"
import useCrud from "../../hooks/useCrud.ts";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {MEDIA_URL} from "../../config.ts";

interface Server {
    id: number
    name: string
    category: string
    icon: string
}

type Props = {
    open: boolean
}

interface ServerChannelsProps {
    data: Server[]
}

const UserServers: React.FC<Props & ServerChannelsProps> = ({open, data}) => {
    

    return (
        <>
            <Box sx={{
                height: 50,
                p: 2,
                display: "flex",
                alignItems: "center",
                flex: "1 1 100%",
            }}>
                <Typography
                    sx={{
                        display: open ? "block" : "none",
                    }}
                >
                    Servers
                </Typography>
            </Box>
            <List>
                {
                    data.map((server) => (
                        <ListItem
                            key={server.id}
                            disablePadding
                            sx={{
                                display: open ? "block" : "none",
                            }}
                            dense={true}
                        >
                            <Link
                                to={`/server/${server.id}`}
                                style={{textDecoration: "none", color: "inherit"}}
                            >
                                <ListItemButton sx={{minHeight: 0}}>
                                    <ListItemIcon sx={{minWidth: 0, justifyContent: "center", alignItems: "center"}}>
                                        <ListItemAvatar sx={{minWidth: "50px"}}>
                                            <Avatar src={`${MEDIA_URL}${server.icon}`} alt={server.name}/>
                                        </ListItemAvatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={<Typography variant="body2" noWrap>{server.name}</Typography>}
                                        secondary={<Typography variant="body2" noWrap>{server.category}</Typography>}
                                        sx={{
                                            opacity: open ? 1 : 0,
                                        }}

                                    />
                                </ListItemButton>
                            </Link>

                        </ListItem>
                    ))
                }

            </List>
        </>
    )

}

export default UserServers