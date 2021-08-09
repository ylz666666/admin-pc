import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/layout/Home.vue'
import Store from '../store/index.js'
import per from '../assets/utils/permission'

Vue.use(VueRouter)
const asay = [
  {
    path: '/production',
    name: 'Product',
    meta: {
      title: '商品',
      hidden:false
    },
    icon:'appstore',
    component:Home,
    children: [{
      path: 'productlist',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        hidden:false
      },
      icon: "pic-left" ,
      component: () => import('@/views/page/productList.vue'),
    },
    {
      path: 'productAdd',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
        hidden:false,
      },
      icon:"plus" ,
      component: () => import('@/views/page/productionAdd.vue'),
    },
    {
      path: 'productedit/:id',
      name: 'Productedit',
      meta: {
        title: '编辑商品',
        hidden:true,
      },
      icon:"plus" ,
      component: () => import('@/views/page/productionAdd.vue'),
    },
    {
      path: 'category',
      name: 'CateGory',
      meta: {
        title: '类目管理',
        hidden:false
      },
      icon:"align-center",
      component: () => import('@/views/page/category.vue'),
    }]
  }
]

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    icon:'home',
    meta: {
      title: '首页',
      hidden:false
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '统计',
          hidden:false
        },
        icon:"ordered-list",
        component: () => import('../views/page/index.vue'),
      },

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/login'),
    meta:{
      title:'登录',
      hidden:true,
    },
    icon:"printer"
  },

]

const router = new VueRouter({
  routes
})
let isadd = false;
router.beforeEach((to, from, next) => {//this不是指向vue实例 需要导出文件使用
  //登录跳转处理 跳转的页面是登录页面直接跳转，否则判断是否有登录，有直接跳转，只写一种情况
  //为了配合页面跳转，我们分为2个状态，登录状态和未登录状态
  
  if (to.path != '/login') {
    if (Store.state.user.username && Store.state.user.appkey && Store.state.user.role && Store.state.user.email) {//有密码随便跳
      if (!isadd) {
        // console.log(111,routes.concat(per(asay, Store.state.user.role)));
       Store.dispatch('addList', routes.concat(per(asay, Store.state.user.role))).then(() =>{
          router.addRoutes(asay);
          next();
        })
        isadd = true;
        
      }

      return next();
    } else {//没有密码 跳转的页面不是登录页面，跳转到登录页面
      return next('/login');
    }
  }
  return next();
});

export default router
