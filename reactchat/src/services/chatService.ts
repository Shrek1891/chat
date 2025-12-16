import {useState} from "react";
import useWebSocket from "react-use-websocket";
import useCrud from "../hooks/useCrud.ts";
import type {Server} from "../@types/server";
import {useAuthService} from "./AuthServices.ts";
import {WS_ROOT} from "../config.ts";

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

const useChatWebSocket = (channelId: string, serverId: string) => {
    const [message, setMessage] = useState("")
    const {logout, refreshAccessToken} = useAuthService()
    const [reconnectionAttempt, setReconnectionAttempt] = useState(0)
    const maxConnectionAttempts = 4
    const socketUrl = channelId ? `${WS_ROOT}/${serverId}/${channelId}` : null
    const [newMessage, setNewMessage] = useState<Message[]>([])
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
        onClose: (event: CloseEvent) => {
            if (event.code == 4001) {
                console.log("Authentication Error")
                refreshAccessToken().catch((error) => {
                    if (error.response && error.response.status === 401) {
                        logout()
                    }
                })

            }
            console.log("Close")
            setReconnectionAttempt((prev) => prev + 1)
        },
        onError: () => {
            console.log("Error")
        },
        onMessage: (message) => {
            const data = JSON.parse(message.data)
            setNewMessage(prev => [...prev, data.new_message])
            setMessage("")
        },
        shouldReconnect: (closeEvent) => {
            if (closeEvent.code === 4001 && reconnectionAttempt >= maxConnectionAttempts) {
                return false
            }
            return true
        },
        reconnectInterval: 2000,
    })
    return {newMessage,message, setMessage, sendJsonMessage}
}

export default useChatWebSocket



