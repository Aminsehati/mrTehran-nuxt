<template>
  <div class="artist-page">
    <div class="container-sm">
      <Loading v-if="filters.loading" />
      <div v-else>
        <CoverArtist :ArtistInfo="ArtistInfo" @follow="followArtist" />
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
import getArtist from "@/graphql/queries/artist/getArtist.gql";
import getTracks from "@/graphql/queries/track/getTracks.gql";
import FollowArtist from "@/graphql/mutations/artist/FollowArtist.gql";
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
  async fetch() {
    await this.getArtist();
    await this.getListTracks();
  },
  methods: {
    async getArtist() {
      this.filters.loading = true;
      try {
        const { id } = this.$route.params;
        const httpResponse = await this.$apollo.query({
          query: getArtist,
          variables: {
            id,
          },
        });
        const data = httpResponse.data.getArtist;
        this.ArtistInfo = {
          ...this.ArtistInfo,
          name: data?.name,
          coverImage: this.getImageUrl(data.coverImgUrl),
          countFollowers: data?.Followers || 0,
        };
        this.filters.loading = false;
      } catch (error) {
        return this.$nuxt.error({ statusCode: 404, message: error.message });
      } finally {
        this.filters.loading = false;
      }
    },
    async getListTracks() {
      const { id } = this.$route.params;
      try {
        const httpResponse = await this.$apollo.query({
          query: getTracks,
          variables: {
            filter: {
              artistID: id,
            },
          },
        });
        const data = httpResponse.data.getTracks;
        this.listTracks = data;
      } catch (error) {
        //////
      }
    },
    async followArtist() {
      try {
        this.filters.loading = true;
        const { id } = this.$route.params;
        const httpResponse = await this.$apollo.mutate({
          mutation: FollowArtist,
          variables: {
            id,
          },
        });
        const data = httpResponse.data.FollowArtist;
        this.ArtistInfo.countFollowers = data.Followers;
        this.filters.loading = false;
      } catch (error) {
        ////
      } finally {
        this.filters.loading = false;
      }
    },
  },
};
</script>

<style>
</style>