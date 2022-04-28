<template>
  <div class="album-track">
    <nuxt-link :to="`/album/${albumInfo._id}`">
      <div class="image-album-track">
        <img :src="getImageUrl(albumInfo.imgUrl)" />
      </div>
      <div class="trackName">
        {{ albumInfo.name }}
      </div>
    </nuxt-link>
    <div class="artists ">
      <nuxt-link
        :to="`/artist/${artist._id}`"
        v-for="artist in albumInfo.artists"
        :key="artist._id"
        class="text-light text-14"
      >
        {{ artist.name }}
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import "./style.scss";
export default {
  props: {
    albumInfo: {
      type: Object,
      default: () => {},
    },
  },
};
</script>