<template>
  <div>
    <h5>Clientes:</h5>
    <ClienteTablaComponente :clientes="clientes" />
    <h5>Productos:</h5>
    <ProductoTablaComponente :productos="productos" />
  </div>
</template>

<script>
import ClienteTablaComponente from "@/components/Cliente/ClienteTablaComponente.vue";
import ProductoTablaComponente from "@/components/Producto/ProductoTablaComponente.vue";
export default {
  name: "inicioView",
  components: {
    ClienteTablaComponente,
    ProductoTablaComponente,
  },
  data() {
    return {
      clientes: [],
      productos: [],
    };
  },
  created() {
    this.verClientes();
    this.verProductos();
  },
  methods: {
    async verClientes() {
      const respuesta = await this.axios.get("cliente");
      this.clientes = respuesta.data;
    },
    async verProductos() {
      const respuesta = await this.axios.get("producto");
      this.productos = respuesta.data;
    },
  },
};
</script>
