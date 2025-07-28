import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientesList from '../views/Clientes/ClientesList.vue'
import ClientesForm from '../views/Clientes/ClientesForm.vue'
import ClienteCuentas from '../views/Clientes/ClienteCuentas.vue'
import CuentasList from '../views/Cuentas/CuentasList.vue'
import CuentasForm from '../views/Cuentas/CuentasForm.vue'
import TiposDeCuentaList from '../views/TiposDeCuenta/TiposDeCuentaList.vue' // <-- Nuevo import

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/clientes',
    name: 'clientes-list',
    component: ClientesList
  },
  {
    path: '/clientes/crear',
    name: 'clientes-crear',
    component: ClientesForm
  },
  {
    path: '/clientes/editar/:id',
    name: 'clientes-editar',
    component: ClientesForm,
    props: true
  },
  {
    path: '/clientes/:id/cuentas',
    name: 'cliente-cuentas',
    component: ClienteCuentas,
    props: true
  },
  {
    path: '/cuentas',
    name: 'cuentas-list',
    component: CuentasList
  },
  {
    path: '/cuentas/crear',
    name: 'cuentas-crear',
    component: CuentasForm
  },
  {
    path: '/cuentas/editar/:id',
    name: 'cuentas-editar',
    component: CuentasForm,
    props: true
  },
  {
    path: '/tipos-de-cuenta', // <-- Nueva ruta
    name: 'tipos-de-cuenta-list',
    component: TiposDeCuentaList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router