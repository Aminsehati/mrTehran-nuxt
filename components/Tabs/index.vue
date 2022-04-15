<template>
  <div class="tabs_wrapper">
    <li class="tabs-item" v-for="tab in tabs" :key="tab.id">
      <nuxt-link
        :to="tab.path"
        :class="{ active: $route.fullPath === tab.path }"
      >
        {{
            tab.name
        }}
      </nuxt-link>
    </li>
  </div>
</template>

<script>
import "./style.scss";
export default {
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>