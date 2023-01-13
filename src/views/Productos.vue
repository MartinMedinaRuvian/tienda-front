<template>
  <div>
    <h5>Productos:</h5>
    <ProductoTablaComponente :productos="productos" />
  </div>
</template>

<script>
import ProductoTablaComponente from "@/components/Producto/ProductoTablaComponente.vue";
export default {
  name: "inicioView",
  components: {
    ProductoTablaComponente,
  },
  data() {
    return {
      productos: []
    };
  },
  created() {
    this.verProductos();
  },
  methods: {
    async verProductos() {
      const respuesta = await this.axios.get("producto");
      this.productos = respuesta.data;
    },
  },
};
</script>
