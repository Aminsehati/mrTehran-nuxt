<template>
  <div class="browse_page">
    <Loading v-show="filters.loading" />
    <div class="container-sm" v-show="!filters.loading">
      <Tabs :tabs="tabs" />
      <div class="title mb-20">
        <Title> Featured </Title>
        <Button class="mr-15" secondary @onClick="playAllTracks">
          <i class="fa-solid fa-play mr-10"></i>
          Play All
        </Button>
      </div>
      <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-x-20 gap-y-20 mb-25">
        <TrackItem :trackInfo="track" v-for="track in tracks" :key="track.id" />
      </div>
      <Pagination
        :tottalCount="filters.tottalCount"
        :limit="filters.limit"
        @onChange="chnageSkip"
      />
    </div>
  </div>
</template>

<script>
import "./style.scss";
import TrackService from "@/service/Track";
export default {
  layout: "main",
  data() {
    return {
      tabs: [
        {
          id: 1,
          name: "Featured",
          path: "/browse",
        },
        {
          id: 2,
          name: "Popular",
          path: "/browse/popular",
        },
        {
          id: 3,
          name: "Latest",
          path: "/browse/latest",
        },
        {
          id: 4,
          name: "Podcasts",
          path: "/browse/podcasts",
        },
        {
          id: 5,
          name: "Travel",
          path: "/browse/travel",
        },
      ],
      tracks: [],
      filters: {
        loading: false,
        limit: 5,
        skip: 0,
        tottalCount: 0,
      },
    };
  },
  async fetch() {
    await this.getTrackItems();
    await this.getTracksCount();
  },
  methods: {
    async getTrackItems() {
      try {
        const pagination = {
          limit: this.filters.limit,
          skip: this.filters.skip,
        };
        const httpRequest = await TrackService.getTracks({ pagination });
        const httpResponse = httpRequest.getTracks;
        this.tracks = httpResponse;
      } catch (error) {
        ////
      }
    },
    async getTracksCount() {
      try {
        const httpRequest = await TrackService.getTracksCount();
        const httpResponse = httpRequest.getTracksCount;
        this.filters.tottalCount = httpResponse;
      } catch (error) {
        ///
      }
    },
    chnageSkip(skip) {
      this.filters.skip = skip;
      this.getTrackItems();
    },
    playAllTracks() {
      this.$store.commit("player/setListsPlayer", this.tracks);
    },
  },
};
</script>

<style>
</style>