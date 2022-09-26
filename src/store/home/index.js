import { reqCategoryList,reqGetBannerList,reqFloorList} from "@/api"
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorlist){
        state.floorlist = floorlist
    }
}
const actions = {
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            state.categoryList.length = 16
            commit("CATEGORYLIST",result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            // state.categoryList.length = 16
            commit("GETBANNERLIST",result.data)
        }
    },
    async reqFloorList({commit}){
        let result = await reqFloorList()
        if(result.code == 200){
            // state.categoryList.length = 16
            commit("GETFLOORLIST",result.data)
        }
    }
}
const state = {
    categoryList:[],
    bannerList:[],
    floorlist:[]
}
const getters = {}
export default {
   state,mutations,actions,getters,
}