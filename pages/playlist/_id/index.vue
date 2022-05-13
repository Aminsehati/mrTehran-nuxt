<template>
  <div class="playlist-page">
    <Loading v-if="filters.loading === true" />
    <div class="container-sm" v-else-if="filters.loading === false">
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
import PlayListService from "@/service/PlayList";
import TrackService from "@/service/Track";
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
        const httpRequest = await PlayListService.getPlayList(id);
        const httpResponse = httpRequest.getPlayList;
        console.log(httpResponse);
        this.playListInfo = {
          ...this.playListInfo,
          name: httpResponse?.name,
          Followers: httpResponse?.Followers,
          coverImage: this.getImageUrl(httpResponse?.coverImgUrl || ""),
        };
        this.filters.loading = false;
      } catch (error) {
        return this.$nuxt.error({ statusCode: 404, message: error.message });
      } finally {
        this.filters.loading = false;
      }
    },
    async followArtist() {
      try {
        this.filters.loading = true;
        const { id } = this.$route.params;
        const httpRequest = await PlayListService.FollowPlayList(id);
        const data = httpRequest.FollowPlayList;
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
        const filter = {
          playlistID: this.$route.params.id,
        };
        const httpRequest = await TrackService.getTracks({
          pagination: {},
          sort: {},
          filter,
        });
        const httpResponse = httpRequest.getTracks;
        this.tracks = httpResponse;
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