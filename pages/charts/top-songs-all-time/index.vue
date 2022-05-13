<template>
  <div class="chart-top-songs-all-time">
    <div class="container-sm">
      <Tabs :tabs="tabs" />
    </div>
    <div class="container-sm" v-show="!filters.loading">
      <div class="title-top-song-all-time mb-20">
        <Title> Top Songs Of All Time </Title>
        <Button class="mr-15" secondary @onClick="playAllBestTracks">
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
    <div v-show="filters.loading">
      <Loading />
    </div>
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
    await this.getTopTracksInAllTime();
  },
  methods: {
    async getTopTracksInAllTime() {
      this.filters.loading = true;
      try {
        const pagination = {
          limit: 100,
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
      await this.getTopTracksInAllTime();
    },
  },
  head() {
    return {
      title: "Top Songs Of All Time Chart | MrTehran.com",
    };
  },
};
</script>