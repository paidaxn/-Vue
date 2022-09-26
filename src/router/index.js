import Vue from 'vue'
import VueRouter  from 'vue-router'
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import store from '@/store'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder';
import groupOrder from '@/pages/Center/groupOrder';
Vue.use(VueRouter)

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this,location,() => {},() => {});
  }
};
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

let router = new VueRouter({
    routes:[
        {
            path:'/',
            redirect:"/home"
        }
        ,
        {
            path:"/home",
            component: () => import('@/pages/Home'),
            meta:{show:true}
        },
        {
            path:"/center",
            component:Center,
            meta:{show:true},
            children:[{
              path:"myorder",
              component:myOrder,
            },
            {
              path:"grouporder",
              component:groupOrder,
            },
            {
              path:"/center",
              redirect:'/center/myorder'
            }
          ]
        },
        {
            path:"/trade",
            name:'trade',
            component:Trade,
            meta:{show:true},
            beforeEnter: (to, from, next) => {
              if(from.path == '/shopcart'){
                  next()
              }else{
                next(false)
              }
            }
        },
        {
            path:"/paysuccess",
            name:'paysuccess',
            component:PaySuccess,
            meta:{show:true}
        },
        {
            path:"/pay",
            name:'pay',
            component:Pay,
            meta:{show:true},
            beforeEnter: (to, from, next) => {
              if(from.path == '/trade'){
                  next()
              }else{
                next(false)
              }
            }
        },
        {
            path:"/addcartsuccess",
            name:'addcartsuccess',
            component:AddCartSuccess,
            meta:{show:true}
        },
        {
            path:"/shopcart",
            name:'shopcart',
            component:ShopCart,
            meta:{show:true}
        },
        {
            name: 'detail',
            component:Detail,
            path:"/detail/:skuId",
            meta:{show:true}
        },
        {
            path:"/login",
            component:()=>import('@/pages/Login'),
        },
        {
            path:"/register",
            component:Register
        },
        {   
            name:'search',
            //keyword后加?可不传params参数
            path:"/search/:keyword?",
            component:Search,
            meta:{show:true}
        }
    ], 
    scrollBehavior(to, from, savedPosition) {
      // 始终滚动到顶部
      return { y: 0 }
    },
})
router.beforeEach(async (to, from, next) => {
 //获取仓库中的token-----可以确定用户是登录了
  let token  = store.state.user.token;
  let name = store.state.user.userInfo.name;
  //用户登录了
  if(token){
    //已经登录而且还想去登录------不行
    if(to.path=="/login"||to.path=='/register'){
       next('/');
    }else{
      //已经登陆了,访问的是非登录与注册
      //登录了且拥有用户信息放行
      if(name){
        next();
      }else{
        //登陆了且没有用户信息
        //在路由跳转之前获取用户信息且放行
        try {
         await store.dispatch('getUserInfo');
         next();
        } catch (error) {
          //token失效从新登录
          await store.dispatch('userLogout');
          next('/login')
        }
      }
    }
  }else{
     //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
     let toPath = to.path;
     if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
    //    //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
       next('/login?redirect='+toPath);
     }else{
        next();
     }
  }
});
export default router