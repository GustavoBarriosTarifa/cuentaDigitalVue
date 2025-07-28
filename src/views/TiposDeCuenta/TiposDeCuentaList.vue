<template>
  <div class="container my-4">
    <h1 class="mb-4">Administrar Tipos de Cuenta</h1>

    <div class="card shadow-sm mb-4">
      <div class="card-header bg-primary text-white">
        <h3 class="mb-0">{{ isEditMode ? 'Editar Tipo de Cuenta' : 'Crear Nuevo Tipo de Cuenta' }}</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="guardarTipoDeCuenta">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre del Tipo</label>
            <input type="text" id="nombre" v-model="tipo.nombre" class="form-control" required>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary me-2">{{ isEditMode ? 'Guardar Cambios' : 'Crear Tipo' }}</button>
            <button type="button" @click="cancelarEdicion" class="btn btn-secondary" v-if="isEditMode">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
    
    <div class="card shadow-sm">
      <div class="card-header bg-light">
        <h3 class="mb-0">Tipos de Cuenta Existentes</h3>
      </div>
      <div class="card-body">
        <table class="table table-striped table-hover mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th class="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tipo in tiposDeCuenta" :key="tipo.id">
              <td>{{ tipo.id }}</td>
              <td>{{ tipo.nombre }}</td>
              <td class="text-end">
                <button @click="cargarParaEditar(tipo)" class="btn btn-sm btn-secondary me-2">Editar</button>
                <button @click="eliminarTipoDeCuenta(tipo.id)" class="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TiposDeCuentaList',
  data() {
    return {
      tipo: {
        id: null,
        nombre: ''
      },
      isEditMode: false
    };
  },
  computed: {
    ...mapState(['tiposDeCuenta'])
  },
  methods: {
    ...mapActions(['fetchTiposDeCuenta', 'createTipoDeCuenta', 'updateTipoDeCuenta', 'deleteTipoDeCuenta']),
    guardarTipoDeCuenta() {
        if (this.isEditMode) {
        this.updateTipoDeCuenta(this.tipo)
            .then(() => {
            this.resetFormulario();
            });
        } else {
        const tipoParaCrear = { nombre: this.tipo.nombre };
        this.createTipoDeCuenta(tipoParaCrear)
            .then(() => {
            this.resetFormulario();
            });
        }
    },
    cargarParaEditar(tipo) {
      this.isEditMode = true;
      this.tipo = { ...tipo };
    },
    eliminarTipoDeCuenta(id) {
      if (confirm('¿Estás seguro de que quieres eliminar este tipo de cuenta?')) {
        this.deleteTipoDeCuenta(id);
      }
    },
    cancelarEdicion() {
      this.resetFormulario();
    },
    resetFormulario() {
      this.isEditMode = false;
      this.tipo = {
        id: null,
        nombre: ''
      };
    }
  },
  created() {
    this.fetchTiposDeCuenta();
  }
};
</script>
