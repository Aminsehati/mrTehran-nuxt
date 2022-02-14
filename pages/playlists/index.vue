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
        "
      >
        <PlayListItem
          v-for="playlist in playListsItems"
          :key="playlist.id"
          :playListInfo="playlist"
        />
      </div>
    </div>
  </div>
</template>

<script>
import getPlayList from "@/graphql/queries/playList/getPlayLists.gql";
export default {
  layout: "main",
  data() {
    return {
      playListsItems: [],
    };
  },
  methods: {
    async getPlayListItem() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getPlayList,
        });
        const data = httpResponse.data.getPlayLists;
        this.playListsItems = data;
        console.log(data);
      } catch (error) {}
    },
  },
  mounted() {
    this.getPlayListItem();
  },
};
</script>

<style>
</style>