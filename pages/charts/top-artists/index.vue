<template>
  <div class="chart-top-artists-page">
    <div class="container-sm">
      <Tabs :tabs="tabs" />
    </div>
    <div class="container-sm" v-show="!filters.loading">
      <div class="title-chart-top-artists mb-10">
        <Title> Popular Artists </Title>
      </div>
      <chartArtist
        v-for="(artist, index) in artists"
        :key="artist.id"
        :artistInfo="artist"
        class="mb-20"
      >
        {{ numberAritst(index) }}
      </chartArtist>
    </div>
    <div v-show="filters.loading">
      <Loading />
    </div>
  </div>
</template>

<script>
import "./style.scss";
import tabs from "@/content/tabs";
import ArtistService from "@/service/Artist";
export default {
  layout: "main",
  data() {
    return {
      artists: [],
      filters: {
        loading: false,
      },
      tabs,
    };
  },
  async fetch() {
    await this.getArtists();
  },
  methods: {
    async getArtists() {
      this.filters.loading = true;
      try {
        const sort = {
          Followers: -1,
        };
        const httpRequest = ArtistService.getArtists({
          pagination: {},
          sort,
          filter: {},
        });
        const httpResponse = httpRequest.getArtists;
        this.artists = httpResponse;
        this.filters.loading = false;
      } catch (error) {
        ///
      } finally {
        this.filters.loading = false;
      }
    },
    numberAritst(index) {
      if (index > 9) {
        return index + 1;
      } else {
        return `0${index + 1}`;
      }
    },
  },
  head() {
    return {
      title: "Top Artists Chart | MrTehran.com",
    };
  },
};
</script>

<style>
</style>