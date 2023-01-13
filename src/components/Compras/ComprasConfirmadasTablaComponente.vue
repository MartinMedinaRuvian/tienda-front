<template>
  <div class="mt-5">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">N° Compra</th>
          <th scope="col">Descripción</th>
          <th scope="col">Código</th>
          <th scope="col">Valor</th>
          <th scope="col">Fecha</th>       
        </tr>
      </thead>
      <tbody>
        <tr v-for="compra in compras" :key="compra.codigo">
          <td>{{ compra.numero }}</td>
          <td>{{ compra.descripcionProducto }}</td>
          <td>{{ compra.codigoProducto }}</td>
          <td>{{ compra.valorProducto }}</td>
          <td>{{ compra.fecha }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    compras: [],
  }
};
</script>