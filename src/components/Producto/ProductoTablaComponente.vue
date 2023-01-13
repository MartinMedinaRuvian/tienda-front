<template>
  <div class="mt-5">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Descripción</th>
          <th scope="col">Valor</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.codigo">
          <td>{{ producto.codigo }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.valor }}</td>
          <td>
            <button
              class="btn btn-outline-warning"
              @click="seleccionarProducto(producto)"
            >
              Agregar al carrito
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
    productos: [],
  },
  methods: {
    async seleccionarProducto(producto) {
      if (!this.noHayClienteSeleccionado()) {
        const date = new Date();
  
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const anio = date.getFullYear();
  
        const fecha = dia + "-" + mes + "-" + anio;
        const identificacionCliente = JSON.parse(
          localStorage.getItem("cliente")
        ).identificacion;
  
        const compraGuardar = {
          fecha,
          identificacionCliente,
          total: producto.valor,
        };
        const compraPendiente = await this.compraPendiente(identificacionCliente);
  
        if (compraPendiente == null) {
          const clienteTieneCupoDisponibleNuevaCompra =
            await this.validarCupoClienteNuevaCompra(
              identificacionCliente,
              producto.valor
            );
  
          if (clienteTieneCupoDisponibleNuevaCompra) {
            const respuesta = await this.axios.post("compra", compraGuardar);
            if (respuesta) {
              const numeroCompra = respuesta.data.numero;
              if (numeroCompra !== null) {
                const detalleCompraGuardar = {
                  numeroCompra,
                  codigoProducto: producto.codigo,
                  valor: producto.valor,
                };
                const respuestaDetalle = await this.axios.post(
                  "detalle_compra",
                  detalleCompraGuardar
                );
                if (respuestaDetalle) {
                  alert(respuestaDetalle.data.mensaje);
                }
              }
            }
          } else {
            alert("El cliente seleccionado no tiene cupo suficiente");
          }
        } else {
          const productoYaEstaEnCarritoCliente =
            await this.productoYaEstaEnCarritoCliente(
              producto.codigo,
              identificacionCliente
            );
          if (!productoYaEstaEnCarritoCliente) {
            const clienteTieneCupoDisponibleCompraPendiente =
              await this.validarCupoClienteCompraPendiente(
                identificacionCliente,
                producto.valor
              );
            if (clienteTieneCupoDisponibleCompraPendiente) {
              const detalleCompraGuardar = {
                numeroCompra: compraPendiente.numero,
                codigoProducto: producto.codigo,
                valor: producto.valor,
              };
              const respuestaDetalle = await this.axios.post(
                "detalle_compra",
                detalleCompraGuardar
              );
              if (respuestaDetalle) {
                alert(respuestaDetalle.data.mensaje);
              }
            } else {
              alert("El cliente seleccionado no tiene cupo suficiente");
            }
          } else {
            alert("El cliente seleccionado ya tiene agregado el producto " + producto.descripcion);
          }
        }
      } else {
        alert("Debe seleccionar un cliente primero")
      }
    },
    async validarCupoClienteCompraPendiente(identificacionCliente, total) {
      const respuesta = await this.axios.get(
        "cupo_compra/" + identificacionCliente + "/" + total
      );
      return respuesta.data;
    },
    async validarCupoClienteNuevaCompra(identificacionCliente, total) {
      const respuesta = await this.axios.get(
        "cupo_compra/nueva_compra/" + identificacionCliente + "/" + total
      );
      return respuesta.data;
    },
    async compraPendiente(identificacionCliente) {
      const compra = {
        identificacionCliente,
        estado: "PENDIENTE",
      };
      const respuesta = await this.axios.post("compra/info", compra);
      return respuesta.data;
    },
    async productoYaEstaEnCarritoCliente(
      codigoProducto,
      identificacionCliente
    ) {
      const respuesta = await this.axios.get(
        "detalle_compra/verificar_producto_carrito/" +
          codigoProducto +
          "/" +
          identificacionCliente
      );
      return respuesta.data;
    },
    noHayClienteSeleccionado () {
      return JSON.parse(localStorage.getItem("cliente")) == null;
    }
  },
};
</script>