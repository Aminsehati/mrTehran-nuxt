<template>
  <div class="cover-track">
    <div class="cover-track-wrapper">
      <div class="image">
        <div class="image__cover">
          <img :src="getImageUrl(trackInfo.imgUrl)" />
        </div>
      </div>
      <div class="content px-20">
        <div class="mb-20 flex items-center">
          <p class="text-12 text-light mr-15 flex items-center">
            <i class="fa-solid fa-calendar-check mr-5"></i>
            {{ trackInfo.createdAt }}
          </p>
          <p class="text-12 text-light mr-15 flex items-center">
            <i class="fa-solid fa-play mr-5"></i>
            {{ trackInfo.view | viewTrack }}
          </p>
          <p class="text-12 text-light">
            <i class="fa-regular fa-heart mr-5"></i>
            {{ trackInfo.like }}
          </p>
        </div>
        <h2 class="trackName text-22 font-700">
          {{ trackInfo.trackName }}
        </h2>
        <div class="flex actors">
          <nuxt-link
            to="/"
            v-for="(artist, index) in trackInfo.artists"
            :key="artist._id"
            class="text-light text-13"
          >
            {{ artist.name }}
            {{ trackInfo.artists.length === index + 1 ? "" : "&" }}
          </nuxt-link>
        </div>
        <div class="btn__group mt-20 flex gap-x-15 gap-y-10 flex-wrap">
          <Button
            secondary
            @onClick="pauseTrack"
            v-if="
              activePlayer.idPlayer === trackInfo._id && activePlayer.playing
            "
          >
            <i class="fa-solid fa-pause mr-5"></i>
            Pause
          </Button>
          <Button secondary v-else @onClick="playTrack(trackInfo)">
            <i class="fa-solid fa-play mr-5"></i>
            Play Now
          </Button>
          <Button secondary class="btn__bookMark">
            <i class="fa-regular fa-bookmark mr-5"></i>
            BookMark
          </Button>
          <Button secondary class="btn__like" @onClick="clickTrack(trackInfo)">
            <i class="fa-regular fa-heart mr-5" v-if="!hasLiked"></i>
            <i class="fa-solid fa-heart mr-5 text-yellow" v-else></i>
            {{ hasLiked ? "Liked" : "Like" }}
          </Button>
          <Button secondary class="btn__download">
            <i class="fa-solid fa-download mr-5"></i>
            Download
          </Button>
          <Button secondary class="btn__share">
            <i class="fa-regular fa-share-from-square mr-5"></i>
            Share
          </Button>
          <Button secondary>
            <i class="fa-solid fa-mobile-screen-button mr-5"></i>
            Open In App
          </Button>
        </div>
        <div class="mt-15 flex">
          <span class="text-light text-13"> Track Aritsts : </span>
          <div class="artists flex items-center ml-5">
            <nuxt-link
              :to="`/artist/${aritst._id}`"
              v-for="aritst in trackInfo.artists"
              :key="aritst._id"
              class="text-13"
            >
              {{ aritst.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./style.scss";
import { mapGetters } from "vuex";
import TrackService from '@/service/Track'
export default {
  props: {
    trackInfo: {
      type: Object,
      default: () => {},
    },
  },
  filters: {
    viewTrack(view) {
      let viewLabel = Number(view) > 1000 ? "K" : "";
      return `${view}${viewLabel}`;
    },
  },
  data() {
    return {
      hasLiked: false,
    };
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
        await TrackService.viewTrack(id);
      } catch (error) {
        //////
      }
    },
    clickTrack(track) {
      if(!this.hasLiked){
        this.$emit("like", track);
      }else{
        this.$emit("dilike", track);
      }
    },
  },
};
</script>

<style>
</style>