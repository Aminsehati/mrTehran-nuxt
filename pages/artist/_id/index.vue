<template>
  <div class="artist-page">
    <div class="container-sm">
      <Loading v-if="filters.loading" />
      <div v-else>
        <CoverArtist :ArtistInfo="ArtistInfo" @follow="followArtist" />
        <div class="title_ mb-15">
          <Title> All Tracks </Title>
        </div>
        <div
          class="
            tracks-wrapper
            grid grid
            xl:grid-cols-3
            sm:grid-cols-2
            gap-x-20 gap-y-20
          "
        >
          <TrackItem
            :trackInfo="track"
            v-for="track in listTracks"
            :key="track.id"
          />
        </div>
        <div class="title_ mt-30 mb-15">
          <Title> All Albums </Title>
        </div>
        <div class="tracks-albums">
          <div
            class="
              tracks-wrapper
              grid grid
              xl:grid-cols-3
              sm:grid-cols-2
              gap-x-20 gap-y-20
            "
          >
            <TrackItem
              :trackInfo="track"
              v-for="track in tracksAlbums"
              :key="track._id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArtistService from "@/service/Artist";
import TrackService from '@/service/Track';
import TrackAlbumService from '@/service/TrackAlbum'
import "./style.scss";
export default {
  layout: "main",
  data() {
    return {
      ArtistInfo: {
        name: "",
        coverImage: "",
        countFollowers: 0,
      },
      filters: {
        loading: false,
      },
      listTracks: [],
      tracksAlbums: [],
    };
  },
  async fetch() {
    await this.getArtist();
    await this.getListTracks();
    await this.getListTracksAlbum();
  },
  methods: {
    async getArtist() {
      this.filters.loading = true;
      try {
        const { id } = this.$route.params;
        this.filters.loading = false;
        const httpRequest = await ArtistService.getArtist(id);
        const httpResponse = httpRequest.getArtist;
        this.ArtistInfo = {
          ...this.ArtistInfo,
          name: httpResponse?.name,
          coverImage: this.getImageUrl(httpResponse.coverImgUrl),
          countFollowers: httpResponse?.Followers || 0,
        };
        this.filters.loading = false;
      } catch (error) {
        return this.$nuxt.error({ statusCode: 404, message: error.message });
      } finally {
        this.filters.loading = false;
      }
    },
    async getListTracks() {
      const { id } = this.$route.params;
      try {
        const filter = {
          artistID: id,
        }
        const httpRequest = await TrackService.getTracks({filter});
        const httpResponse = httpRequest.getTracks ;
        this.listTracks = httpResponse;
      } catch (error) {
        //////
      }
    },
    async getListTracksAlbum() {
      try {
        
      } catch (error) {
        console.log(error);
      }
    },
    async followArtist() {
      try {
        this.filters.loading = true;
        const { id } = this.$route.params;
        const httpResponse = await this.$apollo.mutate({
          mutation: FollowArtist,
          variables: {
            id,
          },
        });
        const data = httpResponse.data.FollowArtist;
        this.ArtistInfo.countFollowers = data.Followers;
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
      title: `${this.ArtistInfo.name} | MrTehran.com`,
    };
  },
};
</script>

<style>
</style>