<template>
  <div class="banner-app">
    <div class="container-sm">
      <a :href="url">
        <img :src="imageCover" />
      </a>
    </div>
  </div>
</template>

<script>
import "./style.scss";
export default {
  data() {
    return {
      imageCover: require("@/assets/Images/apppromotebg.jpg"),
      url: "/",
    };
  },
};
</script>

<style>
</style>