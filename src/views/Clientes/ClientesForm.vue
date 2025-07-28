<template>
  <div class="container my-4">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h2 class="mb-0">{{ isEditMode ? 'Editar Cliente' : 'Crear Nuevo Cliente' }}</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="guardarCliente">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input type="text" id="nombre" v-model="cliente.nombre" class="form-control" required>
            </div>
            <div class="col-md-6 mb-3">
              <label for="apellido" class="form-label">Apellido</label>
              <input type="text" id="apellido" v-model="cliente.apellido" class="form-control" required>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="cedula" class="form-label">Cédula</label>
              <input type="text" id="cedula" v-model="cliente.cedula" class="form-control" required>
            </div>
            <div class="col-md-6 mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" v-model="cliente.email" class="form-control" required>
            </div>
          </div>

          <div class="d-flex justify-content-end mt-4">
            <router-link :to="{ name: 'clientes-list' }" class="btn btn-secondary me-2">Cancelar</router-link>
            <button type="submit" class="btn btn-primary">
              {{ isEditMode ? 'Guardar Cambios' : 'Crear Cliente' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ClientesForm',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      cliente: {
        nombre: '',
        apellido: '',
        cedula: '',
        email: ''
      },
      isEditMode: false
    };
  },
  computed: {
    ...mapState(['clientes'])
  },
  methods: {
    ...mapActions(['createCliente', 'updateCliente', 'fetchClienteById']),
    guardarCliente() {
      if (this.isEditMode) {
        this.updateCliente(this.cliente)
          .then(() => {
            this.$router.push({ name: 'clientes-list' });
          });
      } else {
        this.createCliente(this.cliente)
          .then(() => {
            this.$router.push({ name: 'clientes-list' });
          });
      }
    },
    async cargarClienteParaEdicion() {
      const cliente = await this.fetchClienteById(this.id);
      if (cliente) {
        this.cliente = { ...cliente };
      } else {
        // Manejar el caso en que el cliente no se encuentre
        this.$router.push({ name: 'clientes-list' });
      }
    }
  },
  created() {
    if (this.id) {
      this.isEditMode = true;
      this.cargarClienteParaEdicion();
    }
  }
};
</script>
