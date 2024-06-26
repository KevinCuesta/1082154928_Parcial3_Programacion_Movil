import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import DasboardPage from '../views/DasboardPage.vue'
import CategoriaPage from '@/views/CategoriaPage.vue';
import CarroPage  from '@/views/CarroPage.vue';
import CategoriaCrudPage  from '@/views/CategoriaCrudPage.vue';
import CarroCrudPage  from '@/views/CarroCrudPage.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
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
  },
  {
    path: '/carro',
    name: 'Carro',
    component: CarroPage
  },
  {
    path: '/categoriacrud',
    name: 'Categoriacrud',
    component: CategoriaCrudPage
  },
  {
    path: '/carrocrud',
    name: 'Carrocrud',
    component: CarroCrudPage
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
