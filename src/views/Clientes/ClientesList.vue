<template>
  <div class="container-fluid fondo-personalizado py-4">
    <div class="container">
      <h1 class="mb-4">Lista de Clientes</h1>
      
      <div class="row mb-3 align-items-center">
        <div class="col-md-6">
          <button @click="irACrearCliente" class="btn btn-primary">
            Crear Nuevo Cliente
          </button>
        </div>
        <div class="col-md-6 d-flex justify-content-end">
          <input type="text" v-model="busqueda" class="form-control w-75" placeholder="Buscar por nombre o cédula...">
        </div>
      </div>
      
      <table v-if="clientesFiltrados.length" class="table table-striped table-hover shadow-sm">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Email</th>
            <th class="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientesFiltrados" :key="cliente.id">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.apellido }}</td>
            <td>{{ cliente.cedula }}</td>
            <td>{{ cliente.email }}</td>
            <td class="text-end">
              <button @click="irAEditarCliente(cliente.id)" class="btn btn-sm btn-secondary me-2">Editar</button>
              <button @click="eliminarCliente(cliente.id)" class="btn btn-sm btn-danger me-2">Eliminar</button>
              <button @click="verCuentas(cliente.id)" class="btn btn-sm btn-info">Ver Cuentas</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="alert alert-info mt-3" role="alert">
        No hay clientes registrados que coincidan con la búsqueda.
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ClientesList',
  data() {
    return {
      busqueda: ''
    }
  },
  computed: {
    ...mapState(['clientes']),
    clientesFiltrados() {
      if (!this.busqueda) {
        return this.clientes;
      }
      const busquedaMin = this.busqueda.toLowerCase();
      return this.clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(busquedaMin) ||
        cliente.apellido.toLowerCase().includes(busquedaMin) ||
        cliente.cedula.includes(busquedaMin)
      );
    }
  },
  methods: {
    ...mapActions(['fetchClientes', 'deleteCliente']),
    irACrearCliente() {
      this.$router.push({ name: 'clientes-crear' });
    },
    irAEditarCliente(id) {
      this.$router.push({ name: 'clientes-editar', params: { id: id } });
    },
    eliminarCliente(id) {
      if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
        this.deleteCliente(id);
      }
    },
    verCuentas(id) {
      this.$router.push({ name: 'cliente-cuentas', params: { id: id } });
    }
  },
  created() {
    this.fetchClientes();
  }
};
</script>

<style scoped>
.fondo-personalizado {
  background-color: #e9ecef; 
}
</style>