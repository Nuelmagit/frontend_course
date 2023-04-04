import { createRouter, createWebHistory } from "vue-router"
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from "./authGuard";
const routes = [
  {
    path: '/',
    redirect: { name: "operation-home" }
  },
  {
    path: '/operation',
    name: 'operation',
    component: () => import("../modules/operation/layouts/OperationLayout"),
    children: [
      {
        path: '',
        redirect: { name: "operation-home" },
        name: "operation-home-fallback"
      },
      {
        path: 'home',
        name: 'operation-home',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import("../modules/operation/pages/operation-list/OperationList")
      },
      {
        path: 'run',
        name: 'operation-run',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import("../modules/operation/pages/operation/Operation")
      }
    ]
  },
  {
    path: "/outside",
    name: "outside",
    component: () => import("../modules/outside/layouts/OutsideLayout"),
    children: [
      {
        path: '',
        redirect: { name: "outside-login" },
        name: "outside-login-fallback"
      },
      {
        path: 'login',
        name: 'outside-login',
        beforeEnter: [isNotAuthenticatedGuard],
        component: () => import("../modules/outside/pages/Login")
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: "operation-home" }
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
