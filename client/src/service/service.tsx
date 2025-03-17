
import axios from 'axios'
export const userUrl = 'http://localhost:5000/users'


export const requestUser = axios.create({
    baseURL:userUrl,
    withCredentials:true,
  
})
