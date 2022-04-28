<template>
  <div class="track-item">
    <div class="image">
      <nuxt-link :to="`/track/${trackInfo._id}`">
        <img :src="getImageUrl(trackInfo.imgUrl)" />
      </nuxt-link>
    </div>
    <div class="content px-15">
      <nuxt-link :to="`/track/${trackInfo._id}`" class="text-white track-name">
        {{ trackInfo.trackName }}
      </nuxt-link>
      <div class="mt-5 artists">
        <nuxt-link
          v-for="(artist, index) in trackInfo.artists"
          :key="artist._id"
          :to="`/artist/${artist._id}`"
          class="text-light text-13"
        >
          {{ artist.name }}
          {{ trackInfo.artists.length === index + 1 ? "" : "&" }}
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
import viewTrack from "@/graphql/mutations/track/viewTrack.gql";
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
    async playTrack(track) {
      this.audioPlayer.pause();
      if (track._id !== this.activePlayer.idPlayer) {
        this.$store.commit("player/setActivePlayer", track);
        this.audioPlayer.src = this.getAudioUrl(track.audioUrl);
        this.$store.commit("player/addToPlayerLists", track);
        await this.viewTrack();
      }
      this.$store.commit("player/setChangeStatusPlaying", true);
      this.audioPlayer.play();
    },
    pauseTrack() {
      this.$store.commit("player/setChangeStatusPlaying", false);
      this.audioPlayer.pause();
    },
    async viewTrack() {
      try {
        const id = this.activePlayer.idPlayer;
        await this.$apollo.mutate({
          mutation: viewTrack,
          variables: {
            id,
          },
        });
      } catch (error) {
        //////
      }
    },
  },
};
</script>

<style>
</style>