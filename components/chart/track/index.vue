<template>
  <div class="track-chart">
    <div class="track-image">
      <img :src="getImageUrl(trackInfo.imgUrl)" />
    </div>
    <div class="number-track pl-16 pr-5 text-light text-16">
      <slot name="number" />
    </div>
    <div class="info-track w-full px-16">
      <div class="track-name">
        <nuxt-link :to="`/track/${trackInfo._id}`">
          {{ trackInfo.trackName }}
        </nuxt-link>
      </div>
      <div class="artist-name">
        <nuxt-link
          :to="`/artist/${artist._id}`"
          class="text-light text-13"
          v-for="artist in trackInfo.artists"
          :key="artist._id"
        >
          {{ artist.name }}
        </nuxt-link>
      </div>
    </div>
    <div class="date-track text-light text-13">
      <i class="fa-solid fa-calendar text-12 mr-5"></i>
      {{ convertDate(trackInfo.createdAt) }}
    </div>
    <div class="count-likes text-light text-13">
      <i class="fa-regular fa-heart mr-5"></i>
      {{ trackInfo.like }}
      Likes
    </div>
    <div class="count-view text-light text-13">
      <i class="fa-solid fa-play mr-5 text-12"></i>
      {{ trackInfo.view }}
      Plays
    </div>
    <span class="play-track mr-16">
      <i class="fa-solid fa-play"></i>
    </span>
  </div>
</template>
<script>
import "./style.scss";
export default {
  props: {
    trackInfo: {
      type: Object,
      default: () => {},
    },
  },
};
</script>