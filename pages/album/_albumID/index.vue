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
import getAlbum from "@/graphql/queries/album/getAlbum.gql";
import getTracksAlbum from "@/graphql/queries/TrackAlbum/getTracksAlbum.gql";
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
        const httpResponse = await this.$apollo.query({
          query: getAlbum,
          variables: {
            id,
          },
        });
        const data = httpResponse?.data?.getAlbum;
        this.albumInfo = {
          ...this.albumInfo,
          name: data?.name || "",
          imgUrl: data?.imgUrl || "",
          artists: data?.artists || [],
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
        const httpRequest = await this.$apollo.query({
          query: getTracksAlbum,
          variables: {
            filter: {
              albumID,
            },
          },
        });
        const data = httpRequest?.data?.getTracksAlbum || [];
        this.tracks = data.map((item) => {
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