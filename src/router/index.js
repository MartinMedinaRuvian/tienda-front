import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: () => import('@/views/Clientes.vue')
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: () => import('@/views/Carrito.vue')
  },
  {
    path: '/compras',
    name: 'compras',
    component: () => import('@/views/ComprasConfirmadas.vue')
  },
  {
    path: '/productos',
    name: 'productos',
    component: () => import('@/views/Productos.vue')
  },
  {
    path: '/productos-vendidos',
    name: 'productos-vendidos',
    component: () => import('@/views/ProductosVendidos.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
