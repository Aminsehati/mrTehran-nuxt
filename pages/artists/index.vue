<template>
  <div class="artists-page">
    <div class="container-sm">
      <Loading v-if="filters.loading" />
      <div v-else>
        <Title class="mb-20"> Popular Artists </Title>
        <div
          class="
            artist-wrapper
            grid
            xl:grid-cols-3
            sm:grid-cols-2
            gap-x-20 gap-y-20
          "
        >
          <ArtistItem
            :ArtistInfo="artist"
            v-for="artist in listArtists"
            :key="artist.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./style.scss";
import getActors from "../../graphql/queries/Actor/getActors";
export default {
  layout:"main",
  data() {
    return {
      listArtists: [],
      filters: {
        loading: false,
      },
    };
  },
  mounted() {
    this.getlistArtist();
  },
  methods: {
    async getlistArtist() {
      this.filters.loading = true;
      try {
        const httpResponse = await this.$apollo.query({
          query: getActors,
        });
        this.listArtists = httpResponse.data.getActors;
        this.filters.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>