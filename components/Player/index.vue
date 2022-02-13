<template>
  <div class="player" v-show="ActivePlayer.imageUrl">
    <div class="player-seection-track">
      <div class="image-track">
        <img :src="getImageUrl(ActivePlayer.imageUrl)" />
      </div>
      <div class="detail-track pl-15">
        <p>
          {{ ActivePlayer.trackName }}
        </p>
        <p class="text-light">Ho3ein</p>
      </div>
      <span class="volume-player">
        <i class="fa-solid fa-volume-high"></i>
      </span>
      <span class="list-player ml-15">
        <i class="fa-solid fa-bars"></i>
      </span>
    </div>
    <div class="player-section-control">
      <span class="player-time-duration pl-20">
        {{ ActivePlayer.audioDuration | convertTimeAudio }}
      </span>
      <div class="prev-player text-center flex-grow">
        <i class="fa-solid fa-backward-step text-18"></i>
      </div>
      <div class="play">
        <span class="play-icon" @click="playAudio" v-if="!ActivePlayer.playing">
          <i class="fa-solid fa-play"></i>
        </span>
        <span v-else @click="pauseAudio" class="pause-icon">
          <i class="fa-solid fa-pause"></i>
        </span>
      </div>
      <div class="next-player text-center flex-grow">
        <i class="fa-solid fa-backward-step text-18"></i>
      </div>
      <span class="pr-20">
        {{ ActivePlayer.audioCurrentTime | convertTimeAudio }}
      </span>
    </div>
    <div class="player-progress">
      <div
        class="bar-progress-player"
        :style="progressPlayerAudio"
        @resize="resize($event)"
      ></div>
    </div>
  </div>
</template>
<script>
import "./style.scss";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      player: "",
      playing: false,
      audioDuration: 0,
      audioCurrentTime: 0,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters({
      audioPlayer: "player/getAudio",
      ActivePlayer: "player/getActivePlayer",
    }),
    progressPlayerAudio() {
      return {
        width:
          (this.ActivePlayer.audioCurrentTime /
            this.ActivePlayer.audioDuration) *
            100 +
          "%",
      };
    },
  },
  filters: {
    convertTimeAudio(value) {
      return new Date(value * 1000).toISOString().substr(11, 8).slice(3);
    },
  },
  methods: {
    playAudio() {
      this.$store.commit("player/setChangeStatusPlaying", true);
      this.audioPlayer.play();
    },
    pauseAudio() {
      this.$store.commit("player/setChangeStatusPlaying", false);
      this.audioPlayer.pause();
    },
    init() {
      this.player = new Audio();
      this.$store.commit("player/setAudio", new Audio());
      this.audioPlayer.loop = true;
      this.audioPlayer.addEventListener("timeupdate", () => {
        this.$store.commit(
          "player/setAudioDuration",
          parseFloat(this.audioPlayer.duration)
        );
        this.$store.commit(
          "player/setAudioCurrentTime",
          parseFloat(this.audioPlayer.currentTime)
        );
      });
    },
    resize(e) {
      console.log(e);
    },
  },
};
</script>