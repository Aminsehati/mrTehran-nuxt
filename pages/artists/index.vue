<template>
  <div class="artists-page">
    <div class="container-sm">
      <Loading v-show="filters.loading" />
      <div v-show="!filters.loading">
        <Title class="mb-20"> Popular Artists </Title>
        <div
          class="
            artist-wrapper
            grid
            xl:grid-cols-3
            sm:grid-cols-2
            gap-x-20 gap-y-20
            mb-30
          "
        >
          <ArtistItem
            :ArtistInfo="artist"
            v-for="artist in listArtists"
            :key="artist.id"
          />
        </div>
        <Pagination
          :tottalCount="filters.tottalCount"
          :limit="filters.limit"
          @onChange="changeSkip"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "./style.scss";
import getArtists from "@/graphql/queries/artist/getArtists.gql";
import getArtistsCount from "@/graphql/queries/artist/getArtistsCount.gql";
export default {
  layout: "main",
  data() {
    return {
      listArtists: [],
      filters: {
        loading: false,
        limit: 20,
        skip: 1,
        tottalCount: 0,
      },
    };
  },
  async fetch() {
    await this.getlistArtist();
    await this.getActorsCount();
  },
  methods: {
    async getlistArtist() {
      this.filters.loading = true;
      try {
        const httpResponse = await this.$apollo.query({
          query: getArtists,
          variables: {
            pagination: {
              limit: this.filters.limit,
              skip: this.filters.skip,
            },
          },
        });
        const data = httpResponse.data.getArtists;
        this.listArtists = data;
        this.filters.loading = false;
      } catch (error) {
        /////
      } finally {
        this.filters.loading = false;
      }
    },
    async getActorsCount() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getArtistsCount,
        });
        const data = httpResponse?.data?.getArtistsCount || 0;
        this.filters.tottalCount = data;
      } catch (error) {
        ///
      }
    },
    changeSkip(skip) {
      this.filters.skip = skip;
      this.getlistArtist();
    },
  },
};
</script>

<style>
</style>