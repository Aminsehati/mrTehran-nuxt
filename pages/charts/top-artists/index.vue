<template>
  <div class="chart-top-artists-page">
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
import getArtists from "@/graphql/queries/artist/getArtists.gql";
export default {
  layout: "chart",
  data() {
    return {
      artists: [],
      filters: {
        loading: false,
      },
    };
  },
  async fetch() {
    await this.getArtists();
  },
  methods: {
    async getArtists() {
      try {
        this.filters.loading = true;
        const httpRespponse = await this.$apollo.query({
          query: getArtists,
          variables: {
            sort: {
              Followers: -1,
            },
          },
        });
        const data = httpRespponse.data.getArtists || [];
        this.artists = data;
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
};
</script>

<style>
</style>