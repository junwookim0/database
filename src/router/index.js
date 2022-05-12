import Vue from "vue";
import VueRouter from "vue-router";

import "@/datasources/firebase"
import { getAuth } from "firebase/auth"
const auth = getAuth();

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: function () {
      return import("../components/StartPage.vue");
    },
  },
  {
    path: "/main",
    name: "main",
    component: function () {
      return import("../components/MainPage.vue");
    },
    meta : {bAuth : true},
  },
  {
    path: "/login",
    name: "login",
    component: function () {
      return import("../components/LoginPage.vue");
    },
  },
  {
    path: "/register",
    name: "register",
    component: function () {
      return import("../components/RegisterPage.vue");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


//main에 접근했을때 로그인이 되어있다면 main페이지로 
//로그인이 되어 있지않다면 login 페이지로 이동할수 있게 니비게이션 가드사용
//라우트 메타필드를 확인해서 main 페이지에 접근한것을 확인
router.beforeEach((to, from, next)=> {
  //이동할 위치 (to-라우터객체-$router/router)가 main인지 확인 
  const bNeedAuth = to.matched.some(( record)=> record.meta.bAuth);
  //로그인 되어있는지 확인 : firebase 인증필요
  const bCheckAuth = auth.currentUser;

  //main 페이지 이면서 로그인이 되어있지않다면 login 페이지로이동 
  if( bNeedAuth && !bCheckAuth){
    next('/login');
  }else{
    next();
  }
})

export default router;
