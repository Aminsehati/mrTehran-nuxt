<template>
  <div class="track-item">
    <nuxt-link :to="`/track/${trackInfo.id}`">
      <div class="image">
        <img :src="trackInfo.image" />
      </div>
      <div class="content pl-15">
          <h2 class="text-white">
              {{
                  trackInfo.nameTrack
              }}
          </h2>
          <p class="text-light">
              {{
                  trackInfo.Actor
              }}
          </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import "./style.scss";
export default {
  props: {
    trackInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style>
</style>