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
import ArtistService from "@/service/Artist";
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
        const pagination = {
          limit: this.filters.limit,
          skip: this.filters.skip,
        };
        const httpRequest = await ArtistService.getArtists({ pagination });
        const httpResponse = httpRequest.getArtists ;
        this.listArtists = httpResponse;
        this.filters.loading = false;
      } catch (error) {
        /////
      } finally {
        this.filters.loading = false;
      }
    },
    async getActorsCount() {
      try {
        const httpRequest = await ArtistService.getArtistsCount();
        const httpResponse = httpRequest?.getArtistsCount || 0
        this.filters.tottalCount = httpResponse;
      } catch (error) {
        ///
      }
    },
    changeSkip(skip) {
      this.filters.skip = skip;
      this.getlistArtist();
    },
  },
  head() {
    return {
      title: "Singers and Artists | Page 1 | MrTehran.com",
    };
  },
};
</script>

<style>
</style>