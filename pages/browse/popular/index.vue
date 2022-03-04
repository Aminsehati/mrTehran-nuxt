<template>
  <div class="browse_popular_page">
    <Loading v-show="filters.loading" />
    <div class="container-sm" v-show="!filters.loadin">
      <Tabs :tabs="tabs" />
      <div class="title mb-20">
        <Title> Popular </Title>
      </div>
      <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-x-20 gap-y-20 mb-25">
        <TrackItem :trackInfo="track" v-for="track in tracks" :key="track.id" />
      </div>
      <Pagination
        :tottalCount="filters.tottalCount"
        :limit="filters.limit"
        @onChange="chnageSkip"
      />
    </div>
  </div>
</template>

<script>
import "./style.scss";
import getTracks from "@/graphql/queries/track/getTracks.gql";
import getTracksCount from "@/graphql/queries/track/getTracksCount.gql";
export default {
  layout: "main",
  data() {
    return {
      tabs: [
        {
          id: 1,
          name: "Featured",
          path: "/browse",
        },
        {
          id: 2,
          name: "Popular",
          path: "/browse/popular",
        },
        {
          id: 3,
          name: "Latest",
          path: "/browse/latest",
        },
        {
          id: 4,
          name: "Podcasts",
          path: "/browse/podcasts",
        },
        {
          id: 5,
          name: "Travel",
          path: "/browse/travel",
        },
      ],
      tracks: [],
      filters: {
        loading: false,
        limit: 5,
        skip: 0,
        tottalCount: 0,
      },
    };
  },
  async fetch() {
    await this.getTrackItems();
    await this.getTracksCount();
  },
  methods: {
    async getTrackItems() {
      try {
        this.filters.loading = true;
        const httpResponse = await this.$apollo.query({
          query: getTracks,
          variables: {
            pagination: {
              limit: this.filters.limit,
              skip: this.filters.skip,
            },
            sort: {
              view: -1,
            },
          },
        });
        const data = httpResponse.data.getTracks;
        this.filters.loading = false;
        this.tracks = data;
      } catch (error) {
        ////
      } finally {
        this.filters.loading = false;
      }
    },
    async getTracksCount() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getTracksCount,
        });
        const data = httpResponse.data.getTracksCount;
        this.filters.tottalCount = data;
      } catch (error) {
        ///
      }
    },
    chnageSkip(skip) {
      this.filters.skip = skip;
      this.getTrackItems();
    },
  },
};
</script>