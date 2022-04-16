<template>
  <div class="chart-top-song-week-page">
    <div class="container-sm" v-show="!filters.loading">
      <div class="title mb-20">
        <Title> Top Songs Week </Title>
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
    <Loading v-show="filters.loading" />
  </div>
</template>

<script>
import getTracks from "@/graphql/queries/track/getTracks.gql";
import "./style.scss";
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
    return await this.getTopTracks();
  },
  methods: {
    async getTopTracks() {
      try {
        this.filters.loading = true;
        const httpResponse = await this.$apollo.query({
          query: getTracks,
          variables: {
            pagination: {
              limit: 20,
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
      title:"Top Songs Week Chart | MrTehran.com"
    }
  }
};
</script>

<style>
</style>