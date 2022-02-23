<template>
  <div class="track-item">
    <div class="image">
      <nuxt-link :to="`/track/${trackInfo._id}`">
        <img :src="getImageUrl(trackInfo.imgUrl)" />
      </nuxt-link>
    </div>
    <div class="content px-15">
      <nuxt-link :to="`/track/${trackInfo._id}`" class="text-white">
        {{ trackInfo.trackName }}
      </nuxt-link>
      <div>
        <nuxt-link
          v-for="(item, index) in trackInfo.actors"
          :key="item._id"
          :to="`/artist/${item._id}`"
          class="text-light"
        >
          {{ item.name }}
          {{ trackInfo.actors.length === index + 1 ? "" : "&" }}
        </nuxt-link>
      </div>
    </div>
    <div class="play-track">
      <span
        :class="[
          'play-track-icon',
          { 'play-track-active': activePlayer.idPlayer === trackInfo._id },
        ]"
        v-if="activePlayer.idPlayer === trackInfo._id && activePlayer.playing"
        @click="pauseTrack(trackInfo)"
      >
        <i class="fa-solid fa-pause"></i>
      </span>
      <span
        :class="[
          'play-track-icon',
          { 'play-track-active': activePlayer.idPlayer === trackInfo._id },
        ]"
        @click="playTrack(trackInfo)"
        v-else
      >
        <i class="fa-solid fa-play"></i>
      </span>
    </div>
  </div>
</template>

<script>
import "./style.scss";
import { mapGetters } from "vuex";
export default {
  props: {
    trackInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters({
      audioPlayer: "player/getAudio",
      activePlayer: "player/getActivePlayer",
    }),
  },
  methods: {
    playTrack(track) {
      if (track._id !== this.activePlayer.idPlayer) {
        this.$store.commit("player/setImageUrl", track);
        this.$store.commit("player/setTrackName", track);
        this.$store.commit("player/setActorName", track);
        this.$store.commit("player/setIdPlayer", track);
        this.audioPlayer.src = this.getAudioUrl(track.audioUrl);
      }
      this.$store.commit("player/setChangeStatusPlaying", true);
      this.audioPlayer.play();
    },
    pauseTrack() {
      this.$store.commit("player/setChangeStatusPlaying", false);
      this.audioPlayer.pause();
    },
  },
};
</script>

<style>
</style>