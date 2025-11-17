import useWebSocket from "react-use-websocket";
import {useState} from "react";

const socketUrl = "ws://127.0.0.1:8000/ws/test"


const messageInterface = () => {
    const [newMessage, setNewMessage] = useState<string[]>([])

    const [message, setMessage] = useState("")
    const {sendJsonMessage} = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log("Connected")
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
        }
    })

    return <>
        {
            newMessage.map((message, index) => {
                  return(
                      <div key={index}>{message}</div>
                  )
            })
        }
        <form onSubmit={(e) => e.preventDefault()}>
            <label>Enter Message:</label>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
        </form>
        <button onClick={() => sendJsonMessage({type:"message", message})}>Send</button>
    </>
}

export default messageInterface