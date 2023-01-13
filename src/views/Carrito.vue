<template>
  <div>
    <div v-if="comprasPendientes && comprasPendientes.length > 0">
      <CarritoTablaComponente :compras="comprasPendientes" />
      <button class="btn btn-primary" @click="confirmarCompra()">
        Confirmar Compra
      </button>
    </div>
    <div v-else>
      <h4>{{ cliente.nombre }} no tiene productos en el carrito</h4>
    </div>
    <button class="btn btn-secondary mt-5" @click="verClientes()">
      Ver clientes
    </button>
  </div>
</template>
<script>
import CarritoTablaComponente from "@/components/Carrito/CompraTablaComponente.vue";
import { mapGetters } from "vuex";
export default {
  name: "carritoView",
  components: {
    CarritoTablaComponente,
  },
  data() {
    return {
      comprasPendientes: [],
    };
  },
  created() {
    this.verComprasPendientes();
  },
  computed: {
    ...mapGetters(["cliente"]),
  },
  methods: {
    async verComprasPendientes() {
      const cliente = JSON.parse(localStorage.getItem("cliente"));

      if (cliente !== null) {
        const identificacionCliente = cliente.identificacion;

        const respuesta = await this.axios.get(
          "compra/ver_por_cliente/" + identificacionCliente + "/PENDIENTE"
        );
        this.comprasPendientes = respuesta.data;
      }
    },
    async confirmarCompra() {
      const enviar = {
        numero: this.comprasPendientes[0].numero,
      };
      const respuesta = await this.axios.put("compra/confirmar", enviar);
      if (respuesta) {
        alert(respuesta.data.mensaje);
        this.$router.push("/compras");
      }
    },
    verClientes() {
      this.$router.push("/");
    },
  },
};
</script>
