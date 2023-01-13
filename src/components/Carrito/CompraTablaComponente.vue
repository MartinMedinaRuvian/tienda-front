<template>
  <div class="mt-5">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">Descripción</th>
          <th scope="col">Código</th>
          <th scope="col">Valor</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="compra in compras" :key="compra.codigo">
          <td>{{ compra.descripcionProducto }}</td>
          <td>{{ compra.codigoProducto }}</td>
          <td>{{ compra.valorProducto }}</td>
          <td>{{ compra.fecha }}</td>
          <td>
            <button
              class="btn btn-outline-danger"
              @click="eliminarCompra(compra)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    compras: [],
  },
  methods: {
    async eliminarCompra (compra) {
      const respuesta = await this.axios.delete("/detalle_compra/" + compra.codigoProducto + "/" + compra.numero)
      if (respuesta) {
        alert(respuesta.data.mensaje)
        window.location.reload();
      }
    }
  },
};
</script>