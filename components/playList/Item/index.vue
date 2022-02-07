<template>
  <div class="playlist-item">
    <nuxt-link :to="`/playlist/${playListInfo.id}`">
      <div class="image">
        <img :src="playListInfo.image" />
      </div>
      <div class="content pl-15">
          <h2 class="name-playlist">
              {{
                playListInfo.name  
              }}
          </h2>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import "./style.scss";
export default {
  props: {
    playListInfo: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>