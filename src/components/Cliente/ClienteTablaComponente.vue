<template>
  <div class="mt-5">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Identificación</th>
          <th scope="col">Cupo para compra</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.codigo">
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.identificacion }}</td>
          <td>{{ cliente.cupoCompra }}</td>
          <td>
            <button
              class="btn btn-outline-warning"
              @click="seleccionarCliente(cliente)"
            >
              Seleccionar
            </button>
            <button
              class="btn btn-outline-success ml-3"
              @click="verCarritoCliente(cliente)"
            >
              Ver Carrito
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    clientes: [],
  },
  methods: {
    ...mapActions(["guardarCliente"]),
    seleccionarCliente(cliente) {
      this.guardarCliente(cliente);
    },
    verCarritoCliente(cliente) {
      this.seleccionarCliente(cliente);
      this.$router.push("/carrito");
    },
    verCompras(cliente) {
      this.seleccionarCliente(cliente);
      this.$router.push("/compras");
    },
  },
};
</script>