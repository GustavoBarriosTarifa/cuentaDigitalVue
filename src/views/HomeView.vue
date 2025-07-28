<template>
  <div class="container my-4">
    <div class="card text-center shadow-sm">
      <div class="card-header bg-success text-white">
        <h1 class="card-title mb-0">¡Bienvenido a su Sistema de Gestión!</h1>
      </div>
      <div class="card-body">
        <p class="lead">
          Una herramienta poderosa para administrar clientes, cuentas y tipos de cuenta de manera eficiente y organizada.
        </p>
        <p>
          Usa la barra de navegación superior o los botones a continuación para empezar a gestionar la información.
        </p>
        <hr class="my-4">
        
        <h3 class="mb-3">Secciones Principales</h3>
        <div class="row justify-content-center">
          <div class="col-md-4 mb-3">
            <router-link to="/clientes" class="btn btn-lg btn-primary w-100">
              <i class="fas fa-users"></i> Clientes
            </router-link>
          </div>
          <div class="col-md-4 mb-3">
            <router-link to="/cuentas" class="btn btn-lg btn-primary w-100">
              <i class="fas fa-wallet"></i> Cuentas
            </router-link>
          </div>
          <div class="col-md-4 mb-3">
            <router-link to="/tipos-de-cuenta" class="btn btn-lg btn-primary w-100">
              <i class="fas fa-list-alt"></i> Tipos de Cuenta
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>
