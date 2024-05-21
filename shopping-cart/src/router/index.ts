import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import DasboardPage from '../views/DasboardPage.vue'
import CategoriaPage from '@/views/CategoriaPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },{
    path: '/cliente',
    name: 'Cliente',
    component: ClientePage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DasboardPage
  },
  {
    path: '/categoria',
    name: 'Categoria',
    component: CategoriaPage
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
