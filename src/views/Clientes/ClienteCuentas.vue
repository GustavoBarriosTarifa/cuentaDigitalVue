<template>
  <div class="container my-4">
    <div class="card shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center bg-primary text-white">
        <h2 class="card-title mb-0">Cuentas de: {{ cliente ? cliente.nombre + ' ' + cliente.apellido : 'Cargando...' }}</h2>
        <button @click="volver" class="btn btn-light">Volver a Clientes</button>
      </div>
      <div class="card-body">
        <table v-if="cuentas.length" class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Número de Cuenta</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cuenta in cuentas" :key="cuenta.id">
              <td>{{ cuenta.tipo }}</td>
              <td>{{ cuenta.numeroCuenta }}</td>
              <td>{{ cuenta.saldo }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="alert alert-info mt-3" role="alert">
          No se encontraron cuentas para este cliente.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ClienteCuentas',
  props: ['id'], // Recibe el ID del cliente de la URL
  data() {
    return {
      cliente: null,
      cuentas: []
    };
  },
  methods: {
    volver() {
      this.$router.push({ name: 'clientes-list' });
    },
    async fetchCuentasDelCliente() {
      try {
        // Petición para obtener los datos del cliente
        const clienteResponse = await axios.get(`http://localhost:3000/clientes/${this.id}`);
        this.cliente = clienteResponse.data;

        // Petición para obtener las cuentas de ese cliente
        const cuentasResponse = await axios.get(`http://localhost:3000/cuentas?clienteId=${this.id}`);
        this.cuentas = cuentasResponse.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  created() {
    this.fetchCuentasDelCliente();
  }
};
</script>
