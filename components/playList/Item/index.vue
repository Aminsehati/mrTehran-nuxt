<template>
  <div class="playlist-item">
    <nuxt-link :to="`/playlist/${playListInfo.id}`">
      <div class="image">
        <img :src="playListInfo.image" />
      </div>
      <div class="content pl-15">
        <h2 class="name-playlist">
          {{ playListInfo.name }}
        </h2>
        <p class="text-light followers">
          <!-- <i class="fa-regular fa-user text-12"></i> -->
          {{ Followers(playListInfo.Followers) }}
        </p>
      </div>
      <span class="px-15">
        <i class="fa-solid fa-angle-right text-light text-12"></i>
      </span>
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
  methods: {
    Followers(count) {
      return `${count / 1000}k`;
    },
  },
};
</script>

<style>
</style>