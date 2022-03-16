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
import getActors from "../../graphql/queries/Actor/getActors";
import getActorsCount from "../../graphql/queries/Actor/getActorsCount";
export default {
  layout: "main",
  data() {
    return {
      listArtists: [],
      filters: {
        loading: false,
        limit: 4,
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
          query: getActors,
          variables: {
            pagination: {
              limit: this.filters.limit,
              skip: this.filters.skip,
            },
          },
        });
        const data = httpResponse.data.getActors;
        this.listArtists = data;
        this.filters.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async getActorsCount() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getActorsCount,
        });
        const data = httpResponse?.data?.getActorsCount || 0;
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