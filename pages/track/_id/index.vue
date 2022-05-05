<template>
  <div class="track-single">
    <div class="container-sm">
      <div v-if="filters.loading === true">
        <Loading />
      </div>
      <div v-else-if="filters.loading === false">
        <CoverTrack :trackInfo="trackItem" @like="likeTrack" ref="track" />
      </div>
    </div>
  </div>
</template>

<script>
import TrackService from '@/service/Track'
import "./style.scss";
export default {
  layout: "main",
  data() {
    return {
      trackItem: {
        imgUrl: "",
        trackName: "",
        audioUrl: "",
        view: 0,
        like: 0,
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
        const httpRequest = await TrackService.getTrack(id);
        const httpResponse = httpRequest.getTrack ;
        this.trackItem = {
          ...this.trackItem,
          _id: httpResponse?._id || "",
          imgUrl: httpResponse?.imgUrl || "",
          trackName: httpResponse?.trackName || "",
          audioUrl: httpResponse?.audioUrl || "",
          view: httpResponse?.view || 0,
          artists: httpResponse?.artists || [],
          createdAt: httpResponse.createdAt && this.convertDate(httpResponse.createdAt),
          like: httpResponse?.like || 0,
        };
        this.filters.loading = false;
      } catch (error) {
        return this.$nuxt.error({ statusCode: 404, message: error.message });
      } finally {
        this.filters.loading = false;
      }
    },
    async likeTrack(item) {
      try {
        const httpRequest = await TrackService.likeTrack(item._id);
        const data = httpRequest.likeTrack;
        this.trackItem.like = data?.like || 0;
        const refComponent = this.$refs.track;
        refComponent.hasLiked = true;
      } catch (error) {
        ////
      }
    },
  },
};
</script>

<style>
</style>