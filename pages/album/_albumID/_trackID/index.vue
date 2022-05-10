<template>
  <div class="album-tracks-page">
    <div class="container-sm">
      <div v-if="filters.loading === true">
        <Loading />
      </div>
      <div v-else-if="filters.loading === false">
        <CoverTrack :trackInfo="trackItem" @like="likeTrackAlbum" ref="track" />
        <div class="tracks-alumb mt-30" ref="tracks">
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
  </div>
</template>
<script>
import "../../style.scss";
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
      filters: {
        loading: false,
      },
      tracks: [],
    };
  },
  async fetch() {
    await this.getTrackAlbum();
  },
  mounted() {
    document.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    document.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    async getTrackAlbum() {
      this.filters.loading = true;
      try {
        const { trackID } = this.$route.params;
        const httpRequest = await TrackAlbumService.getTrackAlbum(trackID);
        const httpResponse = httpRequest.getTrackAlbum;
        this.trackItem = {
          ...this.trackItem,
          imgUrl: httpResponse?.album?.imgUrl || "",
          trackName: httpResponse?.trackName || "",
          audioUrl: httpResponse?.audioUrl || "",
          view: httpResponse?.view || 0,
          like: httpResponse?.like || 0,
          artists: httpResponse?.album?.artists || [],
          createdAt:
            (httpResponse?.createdAt &&
              this.convertDate(httpResponse?.createdAt)) ||
            "",
          _id: httpResponse?._id || "",
          albumID: httpResponse?.albumID || "",
        };
        this.filters.loading = false;
      } catch (error) {
        return this.$nuxt.error({ statusCode: 404, message: error.message });
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
    async likeTrackAlbum() {
      try {
        const id = this.$route.params.trackID;
        const httpRequest = await TrackAlbumService.likeTrackAlbum(id);
        const data = httpRequest?.likeTrackAlbum;
        this.trackItem = {
          ...this.trackItem,
          like: data?.like || 0,
        };
        const trackRef = this.$refs.track;
        trackRef.hasLiked = true;
      } catch (error) {
        ///
      }
    },
    async onScroll() {
      const tracks = this.$refs.tracks;
      const innerHeight = window.innerHeight;
      if (tracks) {
        const marginTracks = tracks.getBoundingClientRect().top;
        if(marginTracks - innerHeight < -50){
          await this.getTracksAlbum();
        }
      }
    },
  },
};
</script>