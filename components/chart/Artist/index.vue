<template>
  <div class="chart-artist">
    <nuxt-link :to="`/artist/${artistInfo._id}`">
      <div class="image-artist">
        <img :src="getImageUrl(artistInfo.imgUrl)" />
      </div>
      <div class="number-artist pl-16 pr-5 text-light text-16">
        <slot />
      </div>
      <div class="artist-info w-100 px-16">
        <h2 class="title text-14">
          {{ artistInfo.name }}
        </h2>
        <p class="text-light text-12">
          <i class="fa-solid fa-user text-12 mr-5"></i>
          {{ artistInfo.Followers }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import "./style.scss";
export default {
  props: {
    artistInfo: {
      type: Object,
      default: () => {},
    },
  },
};
</script>