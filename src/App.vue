<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <span class="navbar-brand">觀光資訊</span>
      <div class="navbar-nav">
        <router-link class="btn btn-outline-primary me-2" to="/">
          Composition API 版本
        </router-link>
        <router-link class="btn btn-outline-secondary" to="/options">
          Options API 版本
        </router-link>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>
