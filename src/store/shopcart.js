import { reqCartList,reqDeleteCartById,reqUpdateCheckById} from "@/api"
const actions = {
    async getCartList({commit}){
        let result = await reqCartList()
        // console.log(result);
        if(result.code == 200){
            commit("GETCARTLIST",result.data)
        }
    },    
    async deleteCartListByskuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        // console.log(result);
        if(result.code == 200){
            // commit("GETCARTLIST",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    } ,
    async updateCheckById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckById(skuId,isChecked)
        // console.log(result);
        if(result.code == 200){
            // commit("GETCARTLIST",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    } ,
    deleteAllCheckCart({dispatch,getters}){
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(element => {
           let promise = element.isChecked == 1? dispatch('deleteCartListByskuId',element.skuId):'';   
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    updataAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(element => {
            // element.isChecked = isChecked;
            let promise = dispatch('updateCheckById',{skuId:element.skuId,isChecked})
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll)
    }
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const state = {
    cartList :[]
}
const getters = {
    cartList(state){
        return state.cartList [0] || {}
    },
    // cartInfoList(state){
    //     return state.shopcart.cartList.cartInfoList
    // }
}
export default {
    state,mutations,actions,getters
}