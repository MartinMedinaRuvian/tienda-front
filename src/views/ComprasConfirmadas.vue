<template>
  <div>
    <div class="form-group">
      <label for="select">Seleccione el filtro:</label>
      <select
        id="select"
        class="form-select form-control"
        aria-label="Default select example"
        v-if="filtros.length > 0"
        v-model="filtro"
        @change="verComprasConfirmadas()"
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
    <div
      v-if="
        (filtro == 1 && comprasConfirmadas && comprasConfirmadas.length > 0) ||
        filtro == 2
      "
    >
      <ComprasConfirmadasTablaComponente :compras="comprasConfirmadas" />
    </div>
    <div v-else>
      <h4>{{ cliente.nombre }} no tiene compras confirmadas</h4>
    </div>
    <button class="btn btn-secondary mt-5" @click="verClientes()">
      Ver clientes
    </button>
  </div>
</template>
<script>
import ComprasConfirmadasTablaComponente from "@/components/Compras/ComprasConfirmadasTablaComponente.vue";
import { mapGetters } from "vuex";
export default {
  name: "comprasConfirmadas",
  components: {
    ComprasConfirmadasTablaComponente,
  },
  data() {
    return {
      comprasConfirmadas: [],
      filtros: [
        { codigo: 1, descripcion: "Cliente Seleccionado" },
        { codigo: 2, descripcion: "Todas las Compras" },
      ],
      filtro: 2,
    };
  },
  created() {
    this.verComprasConfirmadas();
  },
  computed: {
    ...mapGetters(["cliente"]),
  },
  methods: {
    async verComprasConfirmadas() {
      const cliente = JSON.parse(localStorage.getItem("cliente"));

      let identificacionCliente = "";

      let endpoint = "compra/";

      if (this.filtro == 1) {
        if (cliente !== null) {
          identificacionCliente = cliente.identificacion;
          endpoint =
            "compra/ver_por_cliente/" + identificacionCliente + "/CONFIRMADA";
        } else {
          alert("Debe seleccionar un cliente");
          this.filtro = 2;
        }
      }
      const respuesta = await this.axios.get(endpoint);
      this.comprasConfirmadas = respuesta.data;
    },
    verClientes() {
      this.$router.push("/");
    },
  },
};
</script>
