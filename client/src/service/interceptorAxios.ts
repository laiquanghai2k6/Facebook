import axios, { AxiosInstance }from "axios";
import { store } from "../store/store";
import { setToken } from "../slices/tokenSlice";
import { requestUser } from "./service";
// import axios from 'axios'


export const interceptorAxios = (instance:AxiosInstance)=>{
    console.log('inApp')

    instance.interceptors.request.use((config)=>{

        const token = store.getState().accessToken.accessToken
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
          return config
    },(error)=>{
        return Promise.reject(error)
    })
    instance.interceptors.response.use(
        (res)=>res,
        async (error)=>{

            const originReq = error.config
            if(error.response.status == 403 && !originReq._retry
                
            ){
                originReq._retry = true
                try{
                    const res = await requestUser.get('/handlerRefreshToken',{
                        withCredentials:true
                    })
                    const newAccessToken = res.data 
                    store.dispatch(setToken(newAccessToken))
                    originReq.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return instance(originReq)
                }catch (err) {
                    return Promise.reject(err);
                  }
            }
            return Promise.reject(error);
        }
    )
}