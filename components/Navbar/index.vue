<template>
  <nav class="navbar">
    <div class="container-sm">
      <ul class="list_navbar flex align-center">
        <li v-for="navbar in navbarItems" :key="navbar.id" class="navbar_item">
          <nuxt-link :to="navbar.path" class="text-13 text-light text-400">
            {{ navbar.name }}
          </nuxt-link>
        </li>
        <li class="navbar_item text-light">Search</li>
      </ul>
    </div>
  </nav>
</template>

<script>
import "./style.scss";
import items from './items'
export default {
  data() {
    return {
      navbarItems:items
    };
  },
};
</script>

<style>
</style>