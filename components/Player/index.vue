<template>
  <div class="player" v-if="ActivePlayer.imgUrl">
    <div class="player-seection-track">
      <div class="image-track">
        <nuxt-link :to="trackLink()">
          <img :src="getImageUrl(ActivePlayer.imgUrl)" />
        </nuxt-link>
      </div>
      <div class="detail-track pl-15">
        <nuxt-link :to="trackLink()">
          {{ ActivePlayer.trackName }}
        </nuxt-link>
        <div>
          <nuxt-link
            v-for="(artist, index) in ActivePlayer.artists"
            :key="artist._id"
            :to="`/artist/${artist._id}`"
            class="text-light text-12"
          >
            {{ artist.name }}
            {{ ActivePlayer.artists.length === index + 1 ? "" : "&" }}
          </nuxt-link>
        </div>
      </div>
      <div class="vloumn-wrapper">
        <span class="volume-player">
          <i class="fa-solid fa-volume-high"></i>
        </span>

        <!-- <div class="box-volume">
          <div class="progress-bar">
            <div class="progress-bar-wrapper">
              <div
                class="progress-bar-active"
                :style="styleProgressVloume"
              ></div>
            </div>
          </div>
        </div> -->
      </div>
      <span class="list-player ml-15" @click="$emit('showList')">
        <i class="fa-solid fa-bars"></i>
      </span>
    </div>
    <div class="player-section-control">
      <span class="player-time-duration pl-20">
        {{ ActivePlayer.audioDuration | convertTimeAudio }}
      </span>
      <div
        class="prev-player text-center flex-grow cursor-pointer"
        @click="prevPlayer"
      >
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
      <div
        class="next-player text-center flex-grow cursor-pointer"
        @click="nextPlayer"
      >
        <i class="fa-solid fa-backward-step text-18"></i>
      </div>
      <span class="pr-20">
        {{ ActivePlayer.audioCurrentTime | convertTimeAudio }}
      </span>
    </div>
    <div class="player-progress" ref="progress">
      <div class="bar-progress-player" :style="progressPlayerAudio"></div>
    </div>
  </div>
</template>
<script>
import "./style.scss";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      chnageCurrentTime: false,
      vloumeSize: 1,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters({
      audioPlayer: "player/getAudio",
      ActivePlayer: "player/getActivePlayer",
      lists: "player/getLists",
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
    styleProgressVloume() {
      return {
        height: `${this.vloumeSize}%`,
      };
    },
  },
  filters: {
    convertTimeAudio(value) {
      if (value) {
        return new Date(value * 1000).toISOString().substr(11, 8).slice(3);
      }
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
      this.$store.commit("player/setAudio", new Audio());
      this.audioPlayer.loop = true;
      this.audioPlayer.addEventListener("progress", () => {});
      this.audioPlayer.addEventListener("canplay", () => {
        this.$store.commit(
          "player/setAudioDuration",
          parseFloat(this.audioPlayer.duration)
        );
      });
      if (!this.chnageCurrentTime) {
        this.audioPlayer.addEventListener("timeupdate", () => {
          this.$store.commit(
            "player/setAudioCurrentTime",
            parseFloat(this.audioPlayer.currentTime)
          );
        });
      }
    },
    prevPlayer() {
      const indexItem = this.lists.findIndex(
        (list) => list._id === this.ActivePlayer.idPlayer
      );
      if (indexItem > -1) {
        let item = {};
        if (indexItem === 0) {
          item = this.lists[this.lists.length - 1];
        } else {
          item = this.lists[indexItem - 1];
        }
        this.$store.commit("player/setActivePlayer", item);
        this.audioPlayer.src = this.getAudioUrl(item.audioUrl);
      }
      if (this.ActivePlayer.playing) {
        this.$store.commit("player/setChangeStatusPlaying", true);
        this.audioPlayer.play();
      }
    },
    nextPlayer() {
      let indexItem = this.lists.findIndex(
        (list) => list._id === this.ActivePlayer.idPlayer
      );
      if (indexItem > -1) {
        let item = {};
        if (this.lists.length === indexItem + 1) {
          indexItem = 0;
          item = this.lists[indexItem];
        } else {
          item = this.lists[indexItem + 1];
        }
        this.$store.commit("player/setActivePlayer", item);
        this.audioPlayer.src = this.getAudioUrl(item.audioUrl);
      }
      if (this.ActivePlayer.playing) {
        this.$store.commit("player/setChangeStatusPlaying", true);
        this.audioPlayer.play();
      }
    },
    trackLink() {
      if (!this.ActivePlayer.hasAlbum) {
        return `/track/${this.ActivePlayer.idPlayer}`;
      } else {
        return `/album/${this.ActivePlayer.albumID}/${this.ActivePlayer.idPlayer}`;
      }
    },
  },
  destroyed() {
    if (
      this.$nuxt?.nuxt?.err?.statusCode === 404 ||
      this.$nuxt?.nuxt?.err?.statusCode === 500
    ) {
      this.$store.commit("player/setChangeStatusPlaying", false);
      this.audioPlayer.pause();
      this.$store.commit("player/resetActivePlayer");
    }
  },
};
</script>