<template>
  <div class="track-item">
    <div class="image">
      <nuxt-link :to="`/track/${trackInfo._id}`">
        <img :src="getImageUrl(trackInfo.imgUrl)" />
      </nuxt-link>
    </div>
    <div class="content px-15">
      <nuxt-link :to="`/track/${trackInfo._id}`" class="block trackName">
        {{ trackInfo.trackName }}
      </nuxt-link>
      <nuxt-link :to="`/track/${trackInfo._id}`" class="text-light block">
        {{ trackInfo.actorName }}
      </nuxt-link>
    </div>
    <div class="play-track">
      <span class="play-track-icon" @click="playTrack(trackInfo)">
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
    }),
  },
  methods: {
    playTrack(track) {
      this.$store.commit("player/setImageUrl", track);
      this.$store.commit('player/setChangeStatusPlaying',true);
      this.$store.commit('player/setTrackName',track)
      this.audioPlayer.src = this.getAudioUrl(track.audioUrl);
      this.audioPlayer.play()
    },
  },
};
</script>

<style>
</style>