<template>
  <div class="chart-top-song-week-page">
    <div class="container-sm">
      <Tabs :tabs="tabs" />
    </div>
    <div class="container-sm" v-show="!filters.loading">
      <div class="title mb-20">
        <Title> Top Songs Week </Title>
        <Button class="mr-15" secondary @onClick="playTracksInWeek">
          <i class="fa-solid fa-play mr-10"></i>
          Play All
        </Button>
      </div>
      <ChartTrack
        v-for="(track, index) in tracks"
        :key="track._id"
        :trackInfo="track"
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
import TrackSerice from "@/service/Track";
import "./style.scss";
import tabs from "@/content/tabs";
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
    return await this.getTopTracks();
  },
  methods: {
    async getTopTracks() {
      this.filters.loading = true;
      try {
        const pagination = {
          limit: 20,
          skip: 1,
        };
        const sort = {
          view: -1,
        };
        const httpRequest = await TrackSerice.getTracks({
          pagination,
          sort,
          filter: {},
        });
        const httpResponse = httpRequest.getTracks;
        this.tracks = httpResponse;
        this.filters.loading = false;
      } catch (error) {
        ////
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
      await this.getTopTracks();
    },
    playTracksInWeek() {
      this.$store.commit("player/setListsPlayer", this.tracks);
    },
  },
  head() {
    return {
      title: "Top Songs Week Chart | MrTehran.com",
    };
  },
};
</script>

<style>
</style>