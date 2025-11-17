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
import {Link} from "react-router-dom";
import {MEDIA_URL} from "../../config.ts";

interface Category {
    id: number;
    name: string;
    description: string;
    icon: string;
}

const ServerChannell = () => {
    const theme = useTheme()
    const isDarkMode = theme.palette.mode === "dark"
    const {fetchData, data, error, loading} = useCrud<Category>(
        [],
        "/server/category/"
    )
    useEffect(() => {
        fetchData()
    }, [])
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
                <h5>Explore Categories</h5>
            </Box>
            <List>
                {
                    data?.map((category) => (
                        <ListItem
                            key={category.id}
                            disablePadding dense={true}
                            sx={{
                                display: "block",
                            }}
                        >
                            <Link
                                to={`/explore/${category.name}`}
                                style={{textDecoration: "none", color: "inherit"}}
                            >
                                <ListItemButton sx={{minHeight: 48}}>
                                    <ListItemIcon sx={{minWidth: 0, justifyContent: "center", alignItems: "center"}}>
                                        <ListItemAvatar sx={{minWidth: 0}}>
                                            <img
                                                src={`${MEDIA_URL}${category.icon}`}
                                                alt={category.name}
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                    display: "block",
                                                    margin: "auto",
                                                    filter: isDarkMode ? "inherit(100%)" : "none"
                                                }}
                                            />
                                            <Typography variant="body2" noWrap>
                                                {category.name}
                                            </Typography>
                                        </ListItemAvatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={<Typography paddingLeft={2} variant="body2"
                                                             noWrap>{category.name}</Typography>}
                                        secondary={<Typography variant="body2" paddingLeft={2}
                                                               noWrap>{category.description}</Typography>}
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

export default ServerChannell