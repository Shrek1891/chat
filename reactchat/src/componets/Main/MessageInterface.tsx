import useWebSocket from "react-use-websocket";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useCrud from "../../hooks/useCrud.ts";
import type {Server} from "../../@types/server";
import {Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField} from "@mui/material";
import MessageInterfaceChannels from "./MessageInterfaceChannels.tsx";
import theme from "../../theme/theme.tsx";
import {useTheme} from "@mui/material/styles";
import Scroll from "./Scroll.tsx";

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

interface ServerChannelProps {
    data: Server[];
}

interface SendMessageDate {
    type: string;
    message: string;

    [key: string]: any
}

const messageInterface = ({data}: ServerChannelProps) => {
    const theme = useTheme();
    const server_name = data?.[0]?.name ?? "Server"
    const server_description = data?.[0]?.description ?? ""
    const [newMessage, setNewMessage] = useState<Message[]>([])
    const [message, setMessage] = useState("")
    const {serverId, channelId} = useParams()
    const socketUrl = channelId ? `ws://127.0.0.1:8000/${serverId}/${channelId}` : null
    const {fetchData} = useCrud<Server>([], `/messages/?channel_id=${channelId}`)
    const {sendJsonMessage} = useWebSocket(socketUrl, {
        onOpen: async () => {
            console.log("Connected")
            try {
                const response = await fetchData()
                setNewMessage([])
                setNewMessage(Array.isArray(response) ? response : [])
            } catch (error) {
                console.log(error)
            }
        },
        onClose: () => {
            console.log("Disconnected")
        },
        onError: () => {
            console.log("Error")
        },
        onMessage: (message) => {
            const data = JSON.parse(message.data)
            setNewMessage(prev => [...prev, data.new_message])
            setMessage("")
        }
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendJsonMessage({type: "message", message} as SendMessageDate);
        setMessage("");
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendJsonMessage({type: "message", message} as SendMessageDate);
            setMessage("");
        }
    };
    const formatData = (timeStamp: string) => {
        const date = new Date(Date.parse(timeStamp))
        const formatedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        const formatedTime = date.toLocaleTimeString([],
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }
        )
        return `${formatedDate} at ${formatedTime}`
    }
    return <>
        <MessageInterfaceChannels data={data}/>
        {channelId == undefined
            ? <Box
                sx={{
                    overflow: "hidden",
                    p: {xs: 0},
                    height: `calc(80vh)`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                }}
            >
                <Box sx={{
                    textAlign: "center"
                }}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        letterSpacing={"-0.5px"}
                        sx={{
                            px: 5,
                            maxWidth: "600px",
                        }}
                    >
                        Welcome to {server_name}
                    </Typography>
                    <Typography

                    >
                        {server_description}
                    </Typography>
                </Box>
            </Box> :
            <>
                <Box sx={{
                    overflow: "hidden",
                    p: 0,
                    height: `calc(100vh - 100px)`
                }}>
                    <Scroll>
                        <List sx={{width: "100%", bgcolor: "background.paper"}}>
                            {newMessage.map((message, index) => {
                                return (
                                    <ListItem key={index} alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={"user item"}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontSize: "12px",
                                                variant: "body2",
                                            }}
                                            primary={
                                                <>
                                                    <Typography
                                                        component="span"
                                                        variant="body1"
                                                        color="text.primary"
                                                        sx={{display: "inline", fontW: 600}}
                                                    >
                                                        {message.sender}{" at  "}
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        variant="caption"
                                                        color="textSecondary"
                                                    >
                                                        {formatData(message.timestamp)}
                                                    </Typography>
                                                </>
                                            }
                                            secondary={
                                                <>
                                                    <Typography
                                                        variant="body1"
                                                        style={{
                                                            overflow: "visible",
                                                            whiteSpace: "normal",
                                                            textOverflow: "clip"
                                                        }}
                                                        sx={{
                                                            display: "inline",
                                                            lineHeight: 1.2,
                                                            fontWeight: 400,
                                                            letterSpacing: "-0.2px",
                                                        }}
                                                        component="span"
                                                        color="text.primary"
                                                    >
                                                        {message.content}
                                                    </Typography>
                                                </>
                                            }
                                        >
                                        </ListItemText>
                                    </ListItem>

                                )
                            })}
                        </List>
                    </Scroll>
                </Box>
                <Box sx={{position: "sticky", bottom: 0, width: "100%"}}>
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            bottom: 0,
                            right: 0,
                            padding: "1rem",
                            backgroundColor: theme.palette.background.default,
                            zIndex: 1,
                        }}>
                        <Box
                            sx={{display: "flex", alignItems: "center"}}
                        >
                            <TextField
                                fullWidth
                                multiline
                                minRows={1}
                                value={message}
                                sx={{flexGrow: 1}}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => setMessage(e.target.value)}/>
                        </Box>
                    </form>
                    <button onClick={() => sendJsonMessage({type: "message", message})}>Send</button>
                </Box>

            </>
        }
    </>
}


export default messageInterface