<template>
  <div class="album-tracks-page">
    <div class="container-sm">
      <div class="title mb-20 flex items-center justify-between">
        <Title> Album Tracks </Title>
        <div>
          <Button class="mr-15" secondary @onClick="playTracksAlbum">
            <i class="fa-solid fa-play mr-10"></i>
            Play All
          </Button>
        </div>
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
</template>

<script>
import "../style.scss";
import TrackAlbumService from "@/service/TrackAlbum";
import AlbumService from '@/service/Album'
export default {
  layout: "main",
  data() {
    return {
      albumInfo: {
        _id: "",
        name: "",
        imgUrl: "",
        artists: [],
      },
      tracks: [],
    };
  },
  methods: {
    async getAlbum() {
      try {
        const id = this.$route.params.albumID;
        const httpRequest = await AlbumService.getAlbum(id);
        const httpResponse = httpRequest.getAlbum ;
        this.albumInfo = {
          ...this.albumInfo,
          name: httpResponse?.name || "",
          imgUrl: httpResponse?.imgUrl || "",
          artists: httpResponse?.artists || [],
        };
      } catch (error) {
        ////
      }
    },
    playTracksAlbum() {
      this.$store.commit("player/setListsPlayer", this.tracks);
    },
    async getTracksAlbum() {
      try {
        const { albumID } = this.$route.params;
        const pagination = {};
        const filter = {
          albumID,
        };
        const sort = {};
        const httpRequest = await TrackAlbumService.getTracksAlbum({
          pagination,
          sort,
          filter,
        });
        const httpResponse = httpRequest.getTracksAlbum ;
        this.tracks = httpResponse.map((item) => {
          return {
            ...item,
            artists: this.albumInfo?.artists || [],
            name: this.albumInfo?.name || "",
            imgUrl: this.albumInfo?.imgUrl || "",
            hasAlbum: true,
          };
        });
      } catch (error) {
        /////
      }
    },
  },
  async fetch() {
    await this.getAlbum();
    await this.getTracksAlbum();
  },
};
</script>

<style>
</style>