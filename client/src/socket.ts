import { io } from "socket.io-client";

export const socketUrl = 'http://localhost:3000'



export const socket = io(socketUrl,{
    transports:['websocket'],
    withCredentials: true,
    autoConnect:false
})

