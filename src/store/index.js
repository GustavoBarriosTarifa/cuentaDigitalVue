import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    clientes: [],
    cuentas: [],
    tiposDeCuenta: []
  },
  getters: {
  },
  mutations: {
    // ... (mutaciones de clientes y cuentas se mantienen igual)
    SET_CLIENTES(state, clientes) {
      state.clientes = clientes;
    },
    ADD_CLIENTE(state, cliente) {
      state.clientes.push(cliente);
    },
    UPDATE_CLIENTE(state, clienteActualizado) {
      const index = state.clientes.findIndex(c => c.id === clienteActualizado.id);
      if (index !== -1) {
        state.clientes.splice(index, 1, clienteActualizado);
      }
    },
    REMOVE_CLIENTE(state, id) {
      state.clientes = state.clientes.filter(c => c.id !== id);
    },
    SET_CUENTAS(state, cuentas) {
      state.cuentas = cuentas;
    },
    REMOVE_CUENTA(state, id) {
      state.cuentas = state.cuentas.filter(c => c.id !== id);
    },
    ADD_CUENTA(state, cuenta) {
      state.cuentas.push(cuenta);
    },
    UPDATE_CUENTA(state, cuentaActualizada) {
      const index = state.cuentas.findIndex(c => c.id === cuentaActualizada.id);
      if (index !== -1) {
        state.cuentas.splice(index, 1, cuentaActualizada);
      }
    },
    SET_TIPOS_DE_CUENTA(state, tipos) {
      state.tiposDeCuenta = tipos;
    },
    // <-- Nuevas mutaciones CRUD para tipos de cuenta
    ADD_TIPO_DE_CUENTA(state, tipo) {
      state.tiposDeCuenta.push(tipo);
    },
    UPDATE_TIPO_DE_CUENTA(state, tipoActualizado) {
      const index = state.tiposDeCuenta.findIndex(t => t.id === tipoActualizado.id);
      if (index !== -1) {
        state.tiposDeCuenta.splice(index, 1, tipoActualizado);
      }
    },
    REMOVE_TIPO_DE_CUENTA(state, id) {
      state.tiposDeCuenta = state.tiposDeCuenta.filter(t => t.id !== id);
    }
  },
  actions: {
    // ... (acciones de clientes y cuentas se mantienen igual)
    async fetchClientes({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/clientes');
        commit('SET_CLIENTES', response.data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    },
    async deleteCliente({ commit }, id) {
      try {
        await axios.delete(`http://localhost:3000/clientes/${id}`);
        commit('REMOVE_CLIENTE', id);
      } catch (error) {
        console.error('Error deleting cliente:', error);
      }
    },
    async createCliente({ commit }, cliente) {
      try {
        const response = await axios.post('http://localhost:3000/clientes', cliente);
        commit('ADD_CLIENTE', response.data);
      } catch (error) {
        console.error('Error creating cliente:', error);
      }
    },
    async fetchClienteById({ state }, id) {
      const clienteEnEstado = state.clientes.find(c => c.id == id);
      if (clienteEnEstado) {
        return clienteEnEstado;
      }
      try {
        const response = await axios.get(`http://localhost:3000/clientes/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching cliente by ID:', error);
        return null;
      }
    },
    async updateCliente({ commit }, cliente) {
      try {
        const response = await axios.put(`http://localhost:3000/clientes/${cliente.id}`, cliente);
        commit('UPDATE_CLIENTE', response.data);
      } catch (error) {
          console.error('Error updating cliente:', error);
      }
    },
    async fetchCuentas({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/cuentas');
        commit('SET_CUENTAS', response.data);
      } catch (error) {
        console.error('Error fetching cuentas:', error);
      }
    },
    async deleteCuenta({ commit }, id) {
      try {
        await axios.delete(`http://localhost:3000/cuentas/${id}`);
        commit('REMOVE_CUENTA', id);
      } catch (error) {
        console.error('Error deleting cuenta:', error);
      }
    },
    async createCuenta({ commit }, cuenta) {
      try {
        const response = await axios.post('http://localhost:3000/cuentas', cuenta);
        commit('ADD_CUENTA', response.data);
      } catch (error) {
        console.error('Error creating cuenta:', error);
      }
    },
    async fetchCuentaById({ state }, id) {
      const cuentaEnEstado = state.cuentas.find(c => c.id == id);
      if (cuentaEnEstado) {
        return cuentaEnEstado;
      }
      try {
        const response = await axios.get(`http://localhost:3000/cuentas/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching cuenta by ID:', error);
        return null;
      }
    },
    async updateCuenta({ commit }, cuenta) {
      try {
        const response = await axios.put(`http://localhost:3000/cuentas/${cuenta.id}`, cuenta);
        commit('UPDATE_CUENTA', response.data);
      } catch (error) {
        console.error('Error updating cuenta:', error);
      }
    },
    async fetchTiposDeCuenta({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/tiposDeCuenta');
        commit('SET_TIPOS_DE_CUENTA', response.data);
      } catch (error) {
        console.error('Error fetching tipos de cuenta:', error);
      }
    },
    // <-- Nuevas acciones CRUD para tipos de cuenta
    async createTipoDeCuenta({ commit }, tipo) {
      try {
        const response = await axios.post('http://localhost:3000/tiposDeCuenta', tipo);
        commit('ADD_TIPO_DE_CUENTA', response.data);
      } catch (error) {
        console.error('Error creating tipo de cuenta:', error);
      }
    },
    async updateTipoDeCuenta({ commit }, tipo) {
      try {
        const response = await axios.put(`http://localhost:3000/tiposDeCuenta/${tipo.id}`, tipo);
        commit('UPDATE_TIPO_DE_CUENTA', response.data);
      } catch (error) {
        console.error('Error updating tipo de cuenta:', error);
      }
    },
    async deleteTipoDeCuenta({ commit }, id) {
      try {
        await axios.delete(`http://localhost:3000/tiposDeCuenta/${id}`);
        commit('REMOVE_TIPO_DE_CUENTA', id);
      } catch (error) {
        console.error('Error deleting tipo de cuenta:', error);
      }
    }
  },
  modules: {
  }
})