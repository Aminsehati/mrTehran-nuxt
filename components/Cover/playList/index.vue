<template>
  <div class="cover-playList">
    <div class="wrapper" :style="coverArtist">
      <div class="wrapper-content">
        <h2 class="text-center text-32 font-700">
          {{ playListInfo.name }}
        </h2>
        <p class="text-13 text-center text-light mb-20">
          {{ countFollowers(playListInfo.Followers) }}
          Followers
        </p>
        <div class="btn-group">
          <button class="btn_item" @click="$emit('onFollow')">
            <i class="fa-regular fa-circle text-12 mr-5"></i>
            Follow
          </button>
          <button class="btn_item">
            <i class="fa-solid fa-share-nodes mr-5 text-12"></i>
            Share
          </button>
          <button class="btn_item">
            <i class="fa-solid fa-mobile-screen-button text-12 mr-5"></i>
            Open In App
          </button>
        </div>
      </div>
    </div>
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
  computed: {
    coverArtist() {
      return {
        backgroundImage: `url(${this.playListInfo.coverImage})`
      };
    },
  },
  methods: {
    countFollowers(count) {
      let label = count > 1000 ? "k" : "";
      if (count > 1000) {
        return `${Number(count) / 1000}${label}`;
      } else {
        return `${Number(count)}${label}`;
      }
    },
  },
};
</script>

<style>
</style>