<template>
  <div class="album-tracks-page">
    <div class="container-sm">
      <CoverTrack :trackInfo="trackItem" @like="likeTrack" ref="track" />
      <div class="tracks-alumb mt-30">
        <div class="title mb-20">
          <Title> Album Tracks </Title>
        </div>
        <div
          class="
            artist-wrapper
            grid
            xl:grid-cols-3
            sm:grid-cols-2
            gap-x-20 gap-y-20
          "
        >
          <TrackItem
            :trackInfo="track"
            v-for="track in tracks"
            :key="track._id"
            hasAlbum
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../style.scss";
import AlbumService from "@/service/Album";
import TrackAlbumService from "@/service/TrackAlbum";
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
        _id: "",
        hasAlbum: true,
        albumID: "",
      },
      tracks: [],
    };
  },
  async fetch() {
    await this.getAlbum();
    await this.getTrackAlbum();
    await this.getTracksAlbum();
  },
  methods: {
    async getTrackAlbum() {
      try {
        const { trackID } = this.$route.params;
        const httpRequest = await TrackAlbumService.getTrackAlbum(trackID);
        const httpResponse = httpRequest.getTrackAlbum;
        this.trackItem = {
          ...this.trackItem,
          trackName: httpResponse?.trackName || "",
          audioUrl: httpResponse?.audioUrl || "",
          view: httpResponse?.view || 0,
          like: httpResponse?.like || 0,
          createdAt: httpResponse?.createdAt || "",
          _id: httpResponse?._id || "",
          albumID: httpResponse?.albumID || "",
        };
      } catch (error) {
        ////
      }
    },
    async getAlbum() {
      try {
        const id = this.$route.params.albumID;
        const httpRequest = await AlbumService.getAlbum(id);
        const httpResponse = httpRequest.getAlbum;
        this.trackItem = {
          ...this.trackItem,
          imgUrl: httpResponse?.imgUrl || "",
          artists: httpResponse?.artists || [],
        };
      } catch (error) {
        /////
      }
    },
    async getTracksAlbum() {
      try {
        const { albumID } = this.$route.params;
        const filter = {
          albumID,
        };
        const sort = {};
        const pagination = {};
        const httpRequest = await TrackAlbumService.getTracksAlbum({
          pagination,
          sort,
          filter,
        });
        const httpResponse = httpRequest?.getTracksAlbum || [];
        const data = httpResponse.map((track) => {
          return {
            ...track,
            artists: this.trackItem?.artists || [],
            imgUrl: this.trackItem?.imgUrl || "",
            hasAlbum: true,
          };
        });
        this.tracks = data.filter((item) => item._id !== this.trackItem._id);
      } catch (error) {
        //////
      }
    },
    likeTrack() {},
  },
};
</script>