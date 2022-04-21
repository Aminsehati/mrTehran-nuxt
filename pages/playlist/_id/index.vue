<template>
  <div class="playlist-page">
    <Loading v-if="filters.loading" />
    <div class="container-sm" v-else>
      <CoverPlayList :playListInfo="playListInfo" @onFollow="followArtist" />
      <div class="title -playlist mb-20">
        <Title> Tracklist </Title>
      </div>
      <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-x-20 gap-y-20">
        <TrackItem
          :trackInfo="track"
          v-for="track in tracks"
          :key="track._id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "./style.scss";
import getPlayList from "@/graphql/queries/playList/getPlayList.gql";
import FollowPlayList from "@/graphql/mutations/playList/FollowPlayList.gql";
import getTracks from "@/graphql/queries/track/getTracks.gql";
export default {
  layout: "main",
  data() {
    return {
      playListInfo: {
        name: "",
        coverImage: "",
        Followers: 0,
      },
      tracks: [],
      filters: {
        loading: false,
      },
    };
  },
  async fetch() {
    await this.getPlayList();
    await this.getTracks();
  },
  methods: {
    async getPlayList() {
      try {
        this.filters.loading = true;
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
        this.filters.loading = false;
      } catch (error) {
      } finally {
        this.filters.loading = false;
      }
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
    async getTracks() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getTracks,
          variables: {
            filter: {
              playlistID: this.$route.params.id,
            },
          },
        });
        const data = httpResponse?.data?.getTracks || [];
        this.tracks = data;
      } catch (error) {
        ///
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