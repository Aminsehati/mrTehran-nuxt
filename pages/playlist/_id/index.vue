<template>
  <div class="playlist-page">
    <div class="container-sm">
      <CoverPlayList :playListInfo="playListInfo" />
    </div>
  </div>
</template>

<script>
import "./style.scss";
import getPlayList from "@/graphql/queries/playList/getPlayList.gql";
export default {
  layout:"main",
  data() {
    return {
      playListInfo: {
        name: "",
        coverImage: "",
        Followers: 0,
      },
    };
  },
  async fetch() {
    this.getPlayList();
  },
  methods: {
    async getPlayList() {
      try {
        const { id } = this.$route.params;
        const httpResponse = await this.$apollo.query({
          query: getPlayList,
          variables: {
            id,
          },
        });
        const data = httpResponse.data.getPlayList;
        this.playListInfo = {
          ...this.playListInfo,
          name: data?.name,
          Followers: data?.Followers,
          coverImage: this.getImageUrl(data?.coverImgUrl),
        };
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>