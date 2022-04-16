<template>
  <div class="chart-top-songs-all-time">
    <div class="container-sm" v-show="!filters.loading">
      <div class="title-top-song-all-time mb-20">
        <Title> Top Songs Of All Time </Title>
      </div>
      <ChartTrack
        v-for="(track, index) in tracks"
        :key="track._id"
        :trackInfo="track"
        class="mb-20"
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
import getTracks from "@/graphql/queries/track/getTracks.gql";
export default {
  layout: "chart",
  data() {
    return {
      tracks: [],
      filters: {
        loading: false,
      },
    };
  },
  async fetch() {
    await this.getTopTracksInMonth();
  },
  methods: {
    async getTopTracksInMonth() {
      try {
        this.filters.loading = true;
        const httpResponse = await this.$apollo.query({
          query: getTracks,
          variables: {
            pagination: {
              limit: 100,
              skip: 1,
            },
            sort: {
              view: -1,
            },
          },
        });
        const data = httpResponse?.data?.getTracks || [];
        this.tracks = data;
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
  },
  head(){
    return {
      title:"Top Songs Of All Time Chart | MrTehran.com"
    }
  }
};
</script>