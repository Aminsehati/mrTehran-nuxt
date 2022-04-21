<template>
  <div class="card-track">
    <div class="image-track">
      <nuxt-link :to="`/track/${trackInfo._id}`">
        <img :src="getImageUrl(trackInfo.imgUrl)" />
      </nuxt-link>
    </div>
    <div class="flex py-15">
      <span
        :class="[
          'pause-track',
          { 'play-track-active': activePlayer.idPlayer === trackInfo._id },
        ]"
        @click="pauseTrack"
        v-if="activePlayer.idPlayer === trackInfo._id && activePlayer.playing"
      >
        <i class="fa-solid fa-pause"></i>
      </span>
      <span
        v-else
        :class="[
          'play-track',
          { 'play-track-active': activePlayer.idPlayer === trackInfo._id },
        ]"
        @click="playTrack(trackInfo)"
      >
        <i class="fa-solid fa-play"></i>
      </span>
      <div class="track-info pl-8">
        <div class="track-name">
          <nuxt-link :to="`/track/${trackInfo._id}`">
            {{ trackInfo.trackName }}
          </nuxt-link>
        </div>
        <div class="artists">
          <nuxt-link
            :to="`/artist/${artist._id}`"
            v-for="artist in trackInfo.artists"
            :key="artist._id"
            class="text-13 text-light"
          >
            {{ artist.name }}
          </nuxt-link>
        </div>
      </div>
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
      default: () => {},
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
      if (track._id !== this.activePlayer.idPlayer) {
        this.$store.commit("player/setActivePlayer", track);
        this.audioPlayer.src = this.getAudioUrl(track.audioUrl);
        await this.viewTrack();
        this.$store.commit("player/addToPlayerLists", track);
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