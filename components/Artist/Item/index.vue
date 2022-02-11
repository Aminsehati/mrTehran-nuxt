<template>
  <div class="Artist-item">
    <nuxt-link :to="`/artist/${ArtistInfo._id}`">
      <div class="image">
        <img :src="getImageUrl(ArtistInfo.imgUrl)" :alt="ArtistInfo.name" />
      </div>
      <div class="content pl-15">
        <h2 class="name-artist">
          {{ ArtistInfo.name }}
        </h2>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import "./style.scss";
export default {
  props: {
    ArtistInfo: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>