<template>
  <div class="playlist-page">
    <Loading v-if="filters.loading" />
    <div class="container-sm" v-else>
      <CoverPlayList :playListInfo="playListInfo" @onFollow="followArtist" />
    </div>
  </div>
</template>

<script>
import "./style.scss";
import getPlayList from "@/graphql/queries/playList/getPlayList.gql";
import FollowPlayList from "@/graphql/mutations/playList/FollowPlayList.gql";
export default {
  layout: "main",
  data() {
    return {
      playListInfo: {
        name: "",
        coverImage: "",
        Followers: 0,
      },
      filters: {
        loading: false,
      },
    };
  },
  async fetch() {
    await this.getPlayList();
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
          coverImage: this.getImageUrl(data?.coverImgUrl || ""),
        };
      } catch (error) {}
    },
    async followArtist() {
      try {
        this.filters.loading = true;
        const { id } = this.$route.params;
        const httpResponse = await this.$apollo.mutate({
          mutation: FollowPlayList,
          variables: {
            id,
          },
        });
        const data = httpResponse.data.FollowPlayList;
        this.playListInfo.Followers = data.Followers || 0;
        this.filters.loading = false;
      } catch (error) {
        ////
      } finally {
        this.filters.loading = false;
      }
    },
  },
  head() {
    return {
      title: `${this.playListInfo.name} | MrTehran.com`,
    };
  },
};
</script>

<style>
</style>