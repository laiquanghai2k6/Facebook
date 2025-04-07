
import axios from 'axios'
export const userUrl = 'http://192.168.110.9:3000/users'
export const postUrl = 'http://192.168.110.9:3000/posts'
export const commentUrl = 'http://192.168.110.9:3000/comments'
export const chatUrl = 'http://192.168.110.9:3000/chats'
export const messageUrl = 'http://192.168.110.9:3000/messages'
export const notificationUrl = 'http://192.168.110.9:3000/notifications'

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