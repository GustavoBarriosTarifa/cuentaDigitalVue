<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Mi Aplicación</router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/clientes">Clientes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/cuentas">Cuentas</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/tipos-de-cuenta">Tipos de Cuenta</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/about">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <main class="mt-5 pt-5">
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>