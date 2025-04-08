import { io } from "socket.io-client";

export const socketUrl = import.meta.env.VITE_SOCKET_URL



export const socket = io(socketUrl,{
    transports:['websocket'],
    withCredentials: true,
    autoConnect:false
})

