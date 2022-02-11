<template>
  <div class="spinner-main">
    <div class="spinner-border"></div>
  </div>
</template>

<script>
import "./style.scss";
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style>
</style>