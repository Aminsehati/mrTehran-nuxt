<template>
  <div class="playlist-page">
    <div class="container-sm">
      <Title class="mb-20"> Exclusive Playlists </Title>
      <div
        class="
          playlist-wrapper
          grid
          xl:grid-cols-3
          sm:grid-cols-2
          gap-x-20 gap-y-20
          mb-30
        "
      >
        <PlayListItem
          v-for="playlist in playListsItems"
          :key="playlist.id"
          :playListInfo="playlist"
        />
      </div>
      <Pagination
        :tottalCount="filters.tottalCount"
        :limit="filters.limit"
        @onChange="changeSkip"
      />
    </div>
  </div>
</template>

<script>
import getPlayList from "@/graphql/queries/playList/getPlayLists.gql";
import getPlayListsCount from "@/graphql/queries/playList/getPlayListsCount.gql";
import "./style.scss";
export default {
  layout: "main",
  data() {
    return {
      playListsItems: [],
      filters: {
        loading: false,
        limit: 20,
        skip: 1,
        tottalCount: 0,
      },
    };
  },
  async fetch() {
    await this.getPlayListItem();
    await this.getPlayListsCount();
  },
  methods: {
    async getPlayListItem() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getPlayList,
          variables: {
            pagination: {
              limit: this.filters.limit,
              skip: this.filters.skip,
            },
          },
        });
        const data = httpResponse.data.getPlayLists;
        this.playListsItems = data;
      } catch (error) {}
    },
    async getPlayListsCount() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getPlayListsCount,
        });
        const data = httpResponse.data.getPlayListsCount;
        this.filters.tottalCount = data;
      } catch (error) {
        ///
      }
    },
    changeSkip(skip){
      this.filters.skip = skip;
      this.getPlayListItem()
    }
  },
};
</script>

<style>
</style>