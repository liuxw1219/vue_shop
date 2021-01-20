import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
// import { Form } from "element-ui";

Vue.use(Router);

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path:'/',
//       redirect:'/Login'
//     },
//     {
//       path: '/Login',
//       name:'add',
//       component: Login
//     },
//     {
//       path: '/Home',
//       name:'ffff',
//       component: Home
//     }
//   ]
// })

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/Login",
    },
    {
      path: "/Login",
      component: Login,
    },
    {
      path: "/Home",
      component: Home,
    },
  ],
});
// 导航守卫
router.beforeEach((to, form, next) => {
  // 如果访问登录页放行
  if (to.path === "/Login") return next();
  const tokenStr = window.sessionStorage.getItem("token");
  // 不是登录页返回到登录页
  if (!tokenStr) return next("/Login");
  next();
});

export default router;
