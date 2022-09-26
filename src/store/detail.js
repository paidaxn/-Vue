import { reqGoodsInfo,reqAddOrUpDateShopCart} from "@/api"
import { getUUID } from "@/utils/uuid_token"
const actions = {
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit("GETGOODSINFO",result.data)
        }
    },    
    async addOrUpDateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpDateShopCart(skuId,skuNum);
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
}
}
const mutations = {
    GETGOODSINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const state = {
    goodInfo:{},
    uuid_token:getUUID()
}
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView || {}
},
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
},
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,mutations,actions,getters
}