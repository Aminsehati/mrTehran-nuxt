<template>
  <div class="track-single">
    <div class="container-sm">
      <div v-if="filters.loading === true">
        <Loading />
      </div>
      <div v-else-if="filters.loading === false">
        <CoverTrack :trackInfo="trackItem" @like="likeTrack" ref="track"/>
      </div>
    </div>
  </div>
</template>

<script>
import getTrack from "@/graphql/queries/track/getTrack.gql";
import likeTrack from "@/graphql/mutations/track/likeTrack.gql";
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
        like:0,
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
          _id: data?._id || "",
          imgUrl: data?.imgUrl || "",
          trackName: data?.trackName || "",
          audioUrl: data?.audioUrl || "",
          view: data?.view || 0,
          artists: data?.artists || [],
          createdAt: data.createdAt && this.convertDate(data.createdAt),
          like: data?.like || 0,
        };
        this.filters.loading = false;
      } catch (error) {
        //////
      } finally {
        this.filters.loading = false;
      }
    },
    async likeTrack(item) {
      try {
        const httpResponse = await this.$apollo.mutate({
          mutation: likeTrack,
          variables: {
            id: item._id,
          },
        });
        const data = httpResponse.data.likeTrack;
        this.trackItem.like = data?.like || 0 ;
        const refComponent = this.$refs.track;
        refComponent.hasLiked = true ;
      } catch (error) {
        ////
      }
    },
  },
};
</script>

<style>
</style>