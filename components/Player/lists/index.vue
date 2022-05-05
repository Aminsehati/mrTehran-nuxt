<template>
  <div
    :class="['player-lists', { 'show-player-list': show }]"
    ref="playerLists"
  >
    <div class="top-player-lists">
      <div class="right">
        <i class="fa-solid fa-bars mr-5 text-14"></i>
        Queue
      </div>
      <div class="left">
        <span class="cursor-pointer" @click="$emit('close')">
          <i class="fa-solid fa-xmark"></i>
        </span>
      </div>
    </div>
    <div class="player-lists-body">
      <div v-for="list in lists" :key="list._id" class="player-list-item">
        <div class="image">
          <img :src="getImageUrl(list.imgUrl)" />
        </div>
        <div class="track-info px-16">
          <div class="track-name">
            <nuxt-link :to="`/track/${list._id}`">
              {{ list.trackName }}
            </nuxt-link>
          </div>
          <div class="artists mt-5">
            <nuxt-link
              :to="`/artist/${artist._id}`"
              v-for="artist in list.artists"
              :key="artist.id"
              class="text-light text-13"
            >
              {{ artist.name }}
            </nuxt-link>
          </div>
        </div>
        <div class="flex items-center">
          <span
            class="delete-track mr-15 cursor-pointer"
            @click="deleteTrackAlbum(list)"
          >
            <i class="fa-solid fa-trash text-12"></i>
          </span>
          <span
            :class="[
              'pause-track',
              { 'play-track-active': activePlayer.idPlayer === list._id },
            ]"
            v-if="activePlayer.idPlayer === list._id && activePlayer.playing"
            @click="pauseTrack(list)"
          >
            <i class="fa-solid fa-pause"></i>
          </span>
          <span
            :class="[
              'play-track',
              { 'play-track-active': activePlayer.idPlayer === list._id },
            ]"
            @click="playTrack(list)"
            v-else
          >
            <i class="fa-solid fa-play"></i>
          </span>
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
  data() {
    return {
      playerLists: [],
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      lists: "player/getLists",
      audioPlayer: "player/getAudio",
      activePlayer: "player/getActivePlayer",
    }),
  },
  methods: {
    async playTrack(track) {
      if (track._id !== this.activePlayer.idPlayer) {
        this.$store.commit("player/setActivePlayer", track);
        this.audioPlayer.src = this.getAudioUrl(track.audioUrl);
        // await this.viewTrack();
      }
      this.$store.commit("player/setChangeStatusPlaying", true);
      this.audioPlayer.play();
    },
    async viewTrack() {
      try {
        const id = this.activePlayer.idPlayer;
        await TrackService.viewTrack(id);
      } catch (error) {
        //////
      }
    },
    pauseTrack() {
      this.$store.commit("player/setChangeStatusPlaying", false);
      this.audioPlayer.pause();
    },
    deleteTrackAlbum(item) {
      if (item._id !== this.activePlayer.idPlayer) {
        this.$store.commit("player/deletePlayList", item);
      }
    },
  },
};
</script>