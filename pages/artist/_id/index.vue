<template>
  <div class="artist-page">
    <div class="container-sm">
      <Loading v-if="filters.loading" />
      <div v-else>
        <CoverArtist :ArtistInfo="ArtistInfo" />
        <div class="title_ mb-30">
          <Title> All Tracks </Title>
        </div>
        <div
          class="
            tracks-wrapper
            grid grid
            xl:grid-cols-3
            sm:grid-cols-2
            gap-x-20 gap-y-20
          "
        >
          <TrackItem
            :trackInfo="track"
            v-for="track in listTracks"
            :key="track.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getActor from "../../../graphql/queries/Actor/getActor.gql";
import getTracks from "../../../graphql/queries/track/getTracks.gql";
import "./style.scss";
export default {
  layout: "main",
  data() {
    return {
      ArtistInfo: {
        name: "",
        coverImage: "",
        countFollowers: 0,
      },
      filters: {
        loading: false,
      },
      listTracks: [],
    };
  },
  mounted() {
    this.getArtist();
    this.getListTracks();
  },
  methods: {
    async getArtist() {
      this.filters.loading = true;
      try {
        const { id } = this.$route.params;
        const httpResponse = await this.$apollo.query({
          query: getActor,
          variables: {
            id,
          },
        });
        const data = httpResponse.data.getActor;
        this.ArtistInfo = {
          ...this.ArtistInfo,
          name: data?.name,
          coverImage: this.getImageUrl(data.coverImgUrl),
        };
        this.filters.loading = false;
      } catch (error) {
        return this.$nuxt.error({ statusCode: 404, message: error.message });
      }
    },
    async getListTracks() {
      const { id } = this.$route.params;
      try {
        const httpResponse = await this.$apollo.query({
          query: getTracks,
          variables: {
            actorID: id,
          },
        });
        const data = httpResponse.data.getTracks;
        this.listTracks = data;
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>