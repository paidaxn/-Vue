import axios from 'axios'
import nprogress from 'nprogress'
import store from '@/store'
import "nprogress/nprogress.css"
import {getToken} from '@/utils/token'
const request = axios.create({
    baseURL:"/api",
    timeout:5000
})
request.interceptors.request.use((config)=>{
    nprogress.start();
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    return config
})
request.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data},
(error)=>{return Promise.reject(new Error('fail'))})
export default request;