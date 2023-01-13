<template>
  <div>
    <h5>Clientes:</h5>
    <ClienteTablaComponente :clientes="clientes" />
  </div>
</template>

<script>
import ClienteTablaComponente from "@/components/Cliente/ClienteTablaComponente.vue";
export default {
  name: "inicioView",
  components: {
    ClienteTablaComponente
  },
  data() {
    return {
      clientes: []
    };
  },
  created() {
    this.verClientes();
  },
  methods: {
    async verClientes() {
      const respuesta = await this.axios.get("cliente");
      this.clientes = respuesta.data;
    }
  },
};
</script>
