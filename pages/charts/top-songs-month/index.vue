<template>
  <div class="chart-top-songs-month-page">
    <div class="container-sm">
      <Tabs :tabs="tabs" />
    </div>
    <div class="container-sm" v-show="!filters.loading">
      <div class="title mb-20">
        <Title> Top Songs Month </Title>
        <Button class="mr-15" secondary @onClick="playTracksInMonth">
          <i class="fa-solid fa-play mr-10"></i>
          Play All
        </Button>
      </div>
      <ChartTrack
        v-for="(track, index) in tracks"
        :trackInfo="track"
        :key="track._id"
        class="mb-20"
        @viewTrack="viewTrack"
      >
        <template slot="number">
          {{ numberTrack(index) }}
        </template>
      </ChartTrack>
    </div>
    <Loading v-show="filters.loading" />
  </div>
</template>

<script>
import "./style.scss";
import tabs from "@/content/tabs";
import TrackService from "@/service/Track";
export default {
  layout: "main",
  data() {
    return {
      tracks: [],
      filters: {
        loading: false,
      },
      tabs,
    };
  },
  async fetch() {
    await this.getTopTracksInMonth();
  },
  methods: {
    async getTopTracksInMonth() {
      this.filters.loading = true;
      try {
        const pagination = {
          limit: 20,
          skip: 1,
        };
        const sort = {
          view: -1,
        };
        const filter = {};
        const httpRequest = await TrackService.getTracks({
          pagination,
          sort,
          filter,
        });
        const httpResponse = httpRequest.getTracks;
        this.tracks = httpResponse;
        this.filters.loading = false;
      } catch (error) {
        /////
      } finally {
        this.filters.loading = false;
      }
    },
    numberTrack(index) {
      if (index > 10) {
        return index + 1;
      } else {
        return `0${index + 1}`;
      }
    },
    async viewTrack() {
      await this.getTopTracksInMonth();
    },
    playTracksInMonth() {
      this.$store.commit("player/setListsPlayer", this.tracks);
    },
  },
  head() {
    return {
      title: "Top Songs Month Chart | MrTehran.com",
    };
  },
};
</script>

<style>
</style>