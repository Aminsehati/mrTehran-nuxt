<template>
  <div class="browse_page">
    <div class="container-sm">
      <Tabs :tabs="tabs" />
      <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-x-20 gap-y-20">
        <TrackItem :trackInfo="track" v-for="track in tracks" :key="track.id" />
      </div>
    </div>
  </div>
</template>

<script>
import "./style.scss";
import getTracks from "@/graphql/queries/track/getTracks.gql";
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
    };
  },
  async fetch() {
    await this.getTrackItems();
  },
  methods: {
    async getTrackItems() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getTracks,
        });
        const data = httpResponse.data.getTracks;
        this.tracks = data;
      } catch (error) {
        ////
      }
    },
  },
};
</script>

<style>
</style>