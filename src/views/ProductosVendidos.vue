<template>
  <div>
    <h5>Productos:</h5>
    <div class="form-group">
      <label for="select">Seleccione el filtro:</label>
      <select
        id="select"
        class="form-select form-control"
        aria-label="Default select example"
        v-if="filtros.length > 0"
        v-model="filtro"
        @change="verProductos()"
      >
        <option
          :value="filtro.codigo"
          v-for="filtro in filtros"
          :key="filtro.codigo"
        >
          {{ filtro.descripcion }}
        </option>
      </select>
    </div>
    <ProductoTablaComponente :productos="productos" />
  </div>
</template>

<script>
import ProductoTablaComponente from "@/components/Producto/ProductoVendidosTablaComponete.vue";
export default {
  name: "inicioView",
  components: {
    ProductoTablaComponente,
  },
  data() {
    return {
      productos: [],
      filtros: [
        { codigo: 1, descripcion: "Cliente Seleccionado" },
        { codigo: 2, descripcion: "Todas las Compras" },
      ],
      filtro: 2,
    };
  },
  created() {
    this.verProductos();
  },
  methods: {
    async verProductos() {
      const cliente = JSON.parse(localStorage.getItem("cliente"));

      let identificacionCliente = "TODOS";

      if (this.filtro == 1) {
        if (cliente !== null) {
          identificacionCliente = cliente.identificacion;
        } else {
          alert("Debe seleccionar un cliente");
          this.filtro = 2;
        }
      }
      const respuesta = await this.axios.get(
        "producto/comprados/" + identificacionCliente
      );
      this.productos = respuesta.data;
    },
  },
};
</script>
