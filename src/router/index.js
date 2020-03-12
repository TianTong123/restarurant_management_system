import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/login") //主页
    },
    {
      path: "/restarurant",
      name: "restarurant",
      redirect: "/home",
      component: () => import("@/views"), //框
      children: [
        {
          path: "home",
          name: "home",
          meta:{
            title: '首页',
          },
          component: () => import("@/views/home/home"), //主页
        },
        {
          path: "account",
          name: "account",
          meta:{
            title: '账号管理',
          },
          component: () => import("@/views/account/account"), //账号管理
        },
        {
          path: "order",
          name: "order",
          meta:{
            title: '订单管理',
          },
          component: () => import("@/views/order/order"), //订单管理
        },
        {
          path: "commodity",
          name: "commodity",
          meta:{
            title: '商品管理',
          },
          component: () => import("@/views/commodity/commodity"), //商品管理
        },
        {
          path: "role",
          name: "role",
          meta:{
            title: '角色管理',
          },
          component: () => import("@/views/role/role"), //角色管理
        },
        {
          path: "right",
          name: "right",
          meta:{
            title: '权限管理',
          },
          component: () => import("@/views/right/right"), //权限管理
        },
      ]
    },
  ]
})
