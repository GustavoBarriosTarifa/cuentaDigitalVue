<template>
  <div class="container my-4">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h2 class="card-title mb-0">Lista de Cuentas</h2>
        <button @click="irACrearCuenta" class="btn btn-light">Crear Nueva Cuenta</button>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-end mb-3">
          <label for="filtroTipo" class="form-label me-2 mb-0 d-flex align-items-center">Filtrar por tipo:</label>
          <select id="filtroTipo" v-model="filtroTipo" class="form-select w-25">
            <option value="">Todos</option>
            <option v-for="tipo in tiposDeCuenta" :key="tipo.id" :value="tipo.id">
              {{ tipo.nombre }}
            </option>
          </select>
        </div>
        
        <table v-if="cuentasFiltradas.length" class="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Saldo</th>
              <th>Cliente</th>
              <th class="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cuenta in cuentasFiltradas" :key="cuenta.id">
              <td>{{ cuenta.id }}</td>
              <td>{{ cuenta.tipoNombre || 'Tipo no encontrado' }}</td>
              <td>{{ cuenta.saldo }}</td>
              <td>{{ cuenta.clienteNombreCompleto || 'Cliente no encontrado' }}</td>
              <td class="text-end">
                <button @click="irAEditarCuenta(cuenta.id)" class="btn btn-sm btn-secondary me-2">Editar</button>
                <button @click="eliminarCuenta(cuenta.id)" class="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="alert alert-info mt-3" role="alert">
          No hay cuentas registradas que coincidan con el filtro.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CuentasList',
  data() {
    return {
      filtroTipo: ''
    }
  },
  computed: {
    ...mapState(['cuentas', 'clientes', 'tiposDeCuenta']),

    cuentasEnriquecidas() {
      return this.cuentas.map(cuenta => {
        const cliente = this.clientes.find(c => c.id === cuenta.clienteId);
        const tipo = this.tiposDeCuenta.find(t => t.id === cuenta.tipo);
        
        return {
          ...cuenta,
          clienteNombreCompleto: cliente ? `${cliente.nombre} ${cliente.apellido}` : null,
          tipoNombre: tipo ? tipo.nombre : null
        };
      });
    },
    cuentasFiltradas() {
      if (!this.filtroTipo) {
        return this.cuentasEnriquecidas;
      }
      return this.cuentasEnriquecidas.filter(cuenta => cuenta.tipo === this.filtroTipo);
    }
  },
  methods: {
    ...mapActions(['fetchCuentas', 'deleteCuenta', 'fetchClientes', 'fetchTiposDeCuenta']),
    irACrearCuenta() {
      this.$router.push({ name: 'cuentas-crear' });
    },
    irAEditarCuenta(id) {
      this.$router.push({ name: 'cuentas-editar', params: { id: id } });
    },
    eliminarCuenta(id) {
      if (confirm('¿Estás seguro de que quieres eliminar esta cuenta?')) {
        this.deleteCuenta(id);
      }
    }
  },
  created() {
    this.fetchCuentas();
    this.fetchClientes();
    this.fetchTiposDeCuenta();
  }
};
</script>
