
import axios from 'axios'
export const userUrl = `${import.meta.env.VITE_SERVER_URL}/users`
export const postUrl = `${import.meta.env.VITE_SERVER_URL}/posts`
export const commentUrl = `${import.meta.env.VITE_SERVER_URL}/comments`
export const chatUrl = `${import.meta.env.VITE_SERVER_URL}/chats`
export const messageUrl = `${import.meta.env.VITE_SERVER_URL}/messages`
export const notificationUrl = `${import.meta.env.VITE_SERVER_URL}/notifications`

export const requestUser = axios.create({
    baseURL:userUrl,
    withCredentials:true,
  
})
export const requestPost = axios.create({
    baseURL:postUrl,
    withCredentials:true
})
export const requestComment = axios.create({
    baseURL:commentUrl,
    withCredentials:true
})
export const requestChat = axios.create({
    baseURL:chatUrl,
    withCredentials:true

})
export const requestMessage = axios.create({
    baseURL:messageUrl,
    withCredentials:true

})
export const requestNotification = axios.create({
    baseURL:notificationUrl,
    withCredentials:true

})