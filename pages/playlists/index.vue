<template>
  <div class="playlists-page">
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
import PlayListService from "@/service/PlayList";
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
        const pagination = {
          limit: this.filters.limit,
          skip: this.filters.skip,
        };
        const httpRequest = await PlayListService.getPlayLists({
          pagination,
        });
        const httpResponse = httpRequest.getPlayLists
        this.playListsItems = httpResponse;
      } catch (error) {}
    },
    async getPlayListsCount() {
      try {
        const httpRequest = await PlayListService.getPlayListsCount();
        const httpResponse = httpRequest.getPlayListsCount;
        this.filters.tottalCount = httpResponse;
      } catch (error) {
        ///
      }
    },
    changeSkip(skip) {
      this.filters.skip = skip;
      this.getPlayListItem();
    },
  },
  head() {
    return {
      title: "Playlists | MrTehran.com",
    };
  },
};
</script>

<style>
</style>