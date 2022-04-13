<template>
  <div class="track-single">
    <div class="container-sm">
      <div v-if="filters.loading === true">
        <Loading />
      </div>
      <div v-else-if="filters.loading === false">
        <CoverTrack :trackInfo="trackItem" />
      </div>
    </div>
  </div>
</template>

<script>
import getTrack from "@/graphql/queries/track/getTrack.gql";
import viewTrack from "@/graphql/mutations/track/viewTrack.gql";
import "./style.scss";
export default {
  layout: "main",
  data() {
    return {
      trackItem: {
        imgUrl: "",
        trackName: "",
        audioUrl: "",
        view: "",
        artists: [],
        createdAt: "",
      },
      filters: {
        loading: null,
      },
    };
  },
  async fetch() {
    await this.getTrackItem();
  },
  methods: {
    async getTrackItem() {
      this.filters.loading = true;
      try {
        const { id } = this.$route.params;
        const httpResponse = await this.$apollo.query({
          query: getTrack,
          variables: {
            id,
          },
        });
        const data = httpResponse.data.getTrack;
        this.trackItem = {
          ...this.trackItem,
          imgUrl: data?.imgUrl,
          trackName: data?.trackName,
          audioUrl: data?.audioUrl,
          view: data?.view,
          artists: data?.artists || [],
          createdAt: data.createdAt && this.convertDate(data.createdAt),
        };
        this.filters.loading = false;
      } catch (error) {
        console.log('error',error);
      } finally {
        this.filters.loading = false;
      }
    },
  },
};
</script>

<style>
</style>