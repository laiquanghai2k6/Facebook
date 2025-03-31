
import axios from 'axios'
export const userUrl = 'http://localhost:5000/users'
export const postUrl = 'http://localhost:5000/posts'
export const commentUrl = 'http://localhost:5000/comments'
export const chatUrl = 'http://localhost:5000/chats'
export const messageUrl = 'http://localhost:5000/messages'

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