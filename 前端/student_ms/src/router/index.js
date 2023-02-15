import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/',
    redirect: "/home" // 重定向路由
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/view/test.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/view/home.vue')
  },
  {
    path: '/systemhome',
    name: 'SystemHome',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/uploadVideo',
    name: 'UploadVideo',
    component: () => import('../views/view/uploadVideo.vue')
  },
  {
    path: '/clientLogin',
    name: 'ClientLogin',
    component: () => import('../views/view/clientLogin.vue')
  },
  {
    path: '/videocontent/:id',
    name: 'videoContent',
    component: () => import('../views/view/videoContent.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('../views/view/Search.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/view/personal.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requireAuth: true }, // 进入该路由需要登录权限
    children: [
      {
        path: '/student',
        name: 'Student',
        meta: { requireAuth: true }, // 进入该路由需要登录权限
        component: () => import('../views/Student.vue')
      },
      {
        path: '/role',
        name: 'Role',
        meta: { requireAuth: true }, // 进入该路由需要登录权限
        component: () => import('../views/Role.vue')
      },
      {
        path: '/video',
        name: 'Video',
        meta: { requireAuth: true }, // 进入该路由需要登录权限
        component: () => import('../views/Video.vue')
      },
      {
        path: '/passvideo',
        name: 'PassVideo',
        meta: { requireAuth: true }, // 进入该路由需要登录权限
        component: () => import('../views/PassVideo.vue')
      },
      {
        path: '/reportvideo',
        name: 'ReportVideo',
        meta: { requireAuth: true }, // 进入该路由需要登录权限
        component: () => import('../views/ReportVideo.vue')
      },
     
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 设置登录的过期时间
let EXPIRSETIME = 24 * 60 * 60 * 1000; // 写好之后设置成一天
// 加入全局守卫, 所有前端路由,请求之前都会来到这里
router.beforeEach((to, from, next) => {
  console.log("每次请求路由都会来这里!");
  if (to.meta.requireAuth) {
    let token = localStorage.getItem("stu_token");
    try {
      token = JSON.parse(token);
    } catch (error) {
      token = token;
    }
    if (token) {
      let date = new Date().getTime(); // 获取当前时间
      console.log("过期时间是:" + token.startTime);
      console.log("权限:" + token.state);
      if (date - token.StartTime > EXPIRSETIME) {
        localStorage.removeItem("stu_token");
        next('/login')
      } else {
        next(); // 如果登录没有过期,设置通过
      }
    } else {
      next('/login'); // 如果token 没有, 跳转到首页或者跳转登录页面
    }
  } else {
    if (localStorage.getItem("stu_token") && to.path == '/login') {
      next();  // 不要登录权限页面, 如果用户想登录, 直接跳转首页
    } else {
      next()
    }
  }
})

export default router
