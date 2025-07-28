<template>
  <div class="container my-4">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h2 class="mb-0">{{ isEditMode ? 'Editar Cuenta' : 'Crear Nueva Cuenta' }}</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="guardarCuenta">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="numeroCuenta" class="form-label">Número de Cuenta</label>
              <input type="text" id="numeroCuenta" v-model="cuenta.numeroCuenta" class="form-control" required>
            </div>
            <div class="col-md-6 mb-3">
              <label for="saldo" class="form-label">Saldo</label>
              <input type="number" id="saldo" v-model="cuenta.saldo" class="form-control" required>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="tipoCuenta" class="form-label">Tipo de Cuenta</label>
              <select id="tipoCuenta" v-model="cuenta.tipo" class="form-select" required>
                <option value="" disabled>Seleccione un tipo de cuenta</option>
                <option v-for="tipo in tiposDeCuenta" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label for="cliente" class="form-label">Cliente</label>
              <select id="cliente" v-model="cuenta.clienteId" class="form-select" required>
                <option value="" disabled>Seleccione un cliente</option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }} {{ cliente.apellido }}</option>
              </select>
            </div>
          </div>

          <div class="d-flex justify-content-end mt-4">
            <router-link :to="{ name: 'cuentas-list' }" class="btn btn-secondary me-2">Cancelar</router-link>
            <button type="submit" class="btn btn-primary">
              {{ isEditMode ? 'Guardar Cambios' : 'Crear Cuenta' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CuentasForm',
  props: {
    id: {
      type: String,
      required: false
    },
    clienteId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      cuenta: {
        numeroCuenta: '',
        saldo: 0,
        tipo: '',
        clienteId: ''
      },
      isEditMode: false
    };
  },
  computed: {
    ...mapState(['clientes', 'tiposDeCuenta'])
  },
  methods: {
    ...mapActions(['createCuenta', 'updateCuenta', 'fetchCuentaById', 'fetchClientes', 'fetchTiposDeCuenta']),
    guardarCuenta() {
      if (this.isEditMode) {
        this.updateCuenta(this.cuenta)
          .then(() => {
            this.$router.push({ name: 'cuentas-list' });
          });
      } else {
        this.createCuenta(this.cuenta)
          .then(() => {
            this.$router.push({ name: 'cuentas-list' });
          });
      }
    },
    async cargarCuentaParaEdicion() {
      const cuenta = await this.fetchCuentaById(Number(this.id));
      if (cuenta) {
        this.cuenta = { ...cuenta };
      }
    }
  },
  created() {
    this.fetchClientes();
    this.fetchTiposDeCuenta();

    if (this.id) {
      this.isEditMode = true;
      this.cargarCuentaParaEdicion();
    } else if (this.clienteId) {
      this.cuenta.clienteId = Number(this.clienteId);
    }
  }
};
</script>
