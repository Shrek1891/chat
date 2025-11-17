import {Link, useParams} from "react-router-dom";
import useCrud from "../../hooks/useCrud.ts";
import {useEffect} from "react";
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Avatar,

} from "@mui/material";
import {MEDIA_URL} from "../../config.ts";


interface Server {
    id: number;
    name: string;
    category: string;
    icon: string;
    banner: string;
}

const ExploreServer = () => {
    const {categoryName} = useParams()
    const url = categoryName ? `/server/select/?category=${categoryName}` : `/server/select/`
    const {data,  fetchData} = useCrud<Server>([], url)
    useEffect(() => {
        fetchData()
    }, [categoryName])
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    pt: 6
                }}
            >
                <Typography
                    variant="h4"
                    noWrap
                    component="h1"
                    sx={{
                        display: {
                            sm: "block",
                            fontWeight: 700,
                            letterSpacing: "-0.5px",
                            fontSize: "48px"
                        },
                        textAlign: {xs: "center", sm: "left"}
                    }}
                >
                    {categoryName ? categoryName : "Popular Channels"}
                </Typography>
            </Box>
            <Typography
                variant="h6"
                sx={{
                    pt: 6,
                    pb: 1,
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                }}
            >
                Recommended Channels
            </Typography>
            <Grid container spacing={{xs: 0, md: 2}}>
                {
                    data?.map((server) => (
                        <Grid key={server.id} size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 3,
                        }}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: "none",
                                    borderRadius: "5px",
                                    backgroundColor: "transparent",
                                    backgroundImage: "none",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                <Link
                                    to={`/server/${server.id}`}
                                    style={{textDecoration: "none", color: "inherit"}}
                                >
                                    <CardMedia
                                        component="img"
                                        image={
                                            server.banner ? `${MEDIA_URL}${server.banner}` : "https://images.unsplash.com/photo-1511485977113-f34c92461ad9"
                                        }
                                        alt="random"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "block",
                                                borderRadius: "5px",
                                            }
                                        }}
                                    />
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            p: 0,
                                            "&:last-child": {paddingBottom: 0}
                                        }}
                                    >
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemIcon sx={{minWidth: 0}}>
                                                    <ListItemAvatar
                                                        sx={{
                                                            minWidth: "50px",
                                                        }}
                                                    >
                                                        <Avatar src={`${MEDIA_URL}${server.icon}`}
                                                                alt={server.name}/>
                                                    </ListItemAvatar>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={<Typography variant="body2"
                                                                         noWrap>{server.name}</Typography>}
                                                    secondary={<Typography variant="body2"
                                                                           noWrap>{server.category}</Typography>}
                                                />
                                            </ListItem>
                                        </List>

                                    </CardContent>
                                </Link>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
};

export default ExploreServer;
