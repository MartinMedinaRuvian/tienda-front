<template>
  <div id="app">
    <nav>
      <router-link to="/">Clientes</router-link> |
      <router-link to="/productos">Productos</router-link> |
      <router-link to="/carrito">Carrito de Compras</router-link> |
      <router-link to="/compras">Ventas Realizadas</router-link> |
      <router-link to="/productos-vendidos">Estadística Productos Vendidos</router-link>
    </nav>
    <div class="mb-5">
      <p>Cliente seleccionado:</p>
      <h4>Nombre: {{ cliente.nombre }} - Cupo para compra: $ {{ cliente.cupoCompra }}</h4>
    </div>
    <hr>
    <router-view/>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['cliente'])
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
