import { reqGetCode , reqUserRegister , reqUserLogin,reqUserInfo,reqLogout} from "@/api"
import {getToken,setToken,removeToken} from '@/utils/token'
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            // commit("GETCODE", result.data)
            return 'ok'
            console.log(result);
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user);
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
            // console.log(result);
            setToken(result.data.token);
            return 'ok'     
        }else{
            return Promise.reject(new Error('falie'))
        }
    },   
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINFO", result.data);
            // console.log(result);
            return 'ok'   
        }else{
            return Promise.reject(new Error('falie'))
        }
    },   
    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit("CLEAR");
            // console.log(result);
            return 'ok'   
        }else{
            return Promise.reject(new Error('falie'))
        }
    },   
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    } ,
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.userInfo = {};
        state.token = '';
        removeToken()
    }
}
const state = {
    code:"",
    token:getToken(),
    userInfo:{}
}
const getters = {
}
export default {
    state, mutations, actions, getters
}