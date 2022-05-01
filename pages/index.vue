<template>
  <div class="home-page">
    <Loading v-if="filters.loading" />
    <div v-else>
      <div class="recently-added mb-30">
        <div class="container-sm">
          <div
            class="title-recently-added mb-20 flex justify-between items-center"
          >
            <Title> Recently Added </Title>
            <div class="flex items-center">
              <Button class="mr-15" secondary>
                <i class="fa-solid fa-play mr-10"></i>
                Play All
              </Button>
              <nuxt-link to="/browse/latest" class="text-white">
                See All
                <i class="fa-solid fa-chevron-right ml-10 text-12"></i>
              </nuxt-link>
            </div>
          </div>
          <div
            class="
              grid
              gap-x-10
              lg:grid-cols-6
              md:grid-cols-5
              sm:grid-cols-4
              xs:grid-cols-3
              grid-cols-2
              gap-y-15
            "
          >
            <CardTrack
              v-for="track in listTracksRecentlyAdded"
              :key="track._id"
              :trackInfo="track"
            />
          </div>
        </div>
      </div>
      <Banner class="mb-30" />
      <div class="new-albums mb-30" ref="newAlbums">
        <div class="container-sm">
          <div class="mb-20 flex justify-between items-center">
            <Title> New Albums</Title>
          </div>
          <div class="grid grid-cols-4 gap-x-15 gap-y-20">
            <AlbumItem
              v-for="album in newAlbums"
              :key="album._id"
              :albumInfo="album"
            />
          </div>
        </div>
      </div>
      <div class="best-of-month mb-30" ref="bestTracks">
        <div class="container-sm">
          <div class="mb-20 flex justify-between items-center">
            <Title> Best of Month </Title>
            <div class="flex items-center">
              <Button class="mr-15" secondary @onClick="playAllBestTracks">
                <i class="fa-solid fa-play mr-10"></i>
                Play All
              </Button>
              <nuxt-link to="/browse/popular" class="text-white">
                See All
                <i class="fa-solid fa-chevron-right ml-10 text-12"></i>
              </nuxt-link>
            </div>
          </div>
          <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-x-20 gap-y-20">
            <TrackItem
              :trackInfo="track"
              v-for="track in listTracksBestInMonth"
              :key="track.id"
            />
          </div>
        </div>
      </div>
      <div class="top-play-list mb-30" ref="topPlayList">
        <div class="container-sm">
          <div class="mb-20 flex justify-between items-center">
            <Title> Top Playlists </Title>
            <div>
              <nuxt-link to="/artists" class="text-white">
                See All
                <i class="fa-solid fa-chevron-right ml-10 text-12"></i>
              </nuxt-link>
            </div>
          </div>
          <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-x-20 gap-y-20">
            <PlayListItem
              :playListInfo="playlist"
              v-for="playlist in listPlaylists"
              :key="playlist.id"
            />
          </div>
        </div>
      </div>
      <div class="top-artist-list" ref="topArtist">
        <div class="container-sm">
          <div class="mb-20 flex justify-between items-center">
            <Title> Top Artists </Title>
            <nuxt-link to="/artists" class="text-white">
              See All
              <i class="fa-solid fa-chevron-right ml-10 text-12"></i>
            </nuxt-link>
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
            <ArtistItem
              :ArtistInfo="artist"
              v-for="artist in listActors"
              :key="artist.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./style.scss";
import getPlayList from "@/graphql/queries/playList/getPlayLists.gql";
import getArtists from "@/graphql/queries/artist/getArtists.gql";
import getTracks from "@/graphql/queries/track/getTracks.gql";
import getAlbums from "@/graphql/queries/album/getAlbums.gql";
export default {
  layout: "main",
  data() {
    return {
      listPlaylists: [],
      listActors: [],
      listTracksBestInMonth: [],
      listTracksRecentlyAdded: [],
      newAlbums: [],
      filters: {
        loading: false,
      },
    };
  },
  async fetch() {
    await this.getlistTracksRecentlyAdded();
  },
  mounted() {
    window.addEventListener("scroll", this.onscroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onscroll);
  },
  methods: {
    async getlistPlaylist() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getPlayList,
          variables: {
            pagination: {
              limit: 6,
              skip: 1,
            },
          },
        });
        const data = httpResponse.data.getPlayLists;
        this.listPlaylists = data;
      } catch (error) {
        ///
      } finally {
      }
    },
    async getListActos() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getArtists,
          variables: {
            pagination: {
              limit: 12,
              skip: 1,
            },
          },
        });
        const data = httpResponse.data.getArtists;
        this.listActors = data;
      } catch (error) {
        ////
      } finally {
      }
    },
    async getListTracksInMonths() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getTracks,
          variables: {
            pagination: {
              limit: 12,
              skip: 1,
            },
          },
        });
        const data = httpResponse?.data?.getTracks || [];
        this.listTracksBestInMonth = data;
      } catch (error) {
        ////
      }
    },
    async getlistTracksRecentlyAdded() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getTracks,
          variables: {
            pagination: {
              limit: 6,
              skip: 1,
            },
            sort: {
              createdAt: -1,
            },
          },
        });
        const data = httpResponse?.data?.getTracks || [];
        this.listTracksRecentlyAdded = data;
      } catch (error) {
        ///
      }
    },
    async onscroll() {
      const topArtist = this.$refs.topArtist;
      const topPlayList = this.$refs.topPlayList;
      const bestTracks = this.$refs.bestTracks;
      const newAlbums = this.$refs.newAlbums;
      if (topArtist) {
        const marginTopArtist = topArtist.getBoundingClientRect().top;
        const innerHeight = window.innerHeight;
        if (marginTopArtist - innerHeight < -50) {
          await this.getListActos();
        }
      }
      if (topPlayList) {
        const marginTopArtist = topPlayList.getBoundingClientRect().top;
        const innerHeightTopArtist = window.innerHeight;
        if (marginTopArtist - innerHeightTopArtist < -50) {
          await this.getlistPlaylist();
        }
      }
      if (bestTracks) {
        const marginBestTracks = bestTracks.getBoundingClientRect().top;
        const innerHeightTopArtist = window.innerHeight;
        if (marginBestTracks - innerHeightTopArtist < -50) {
          await this.getListTracksInMonths();
        }
      }
      if (newAlbums) {
        const marginNewAlbums = newAlbums.getBoundingClientRect().top;
        const innerHeightTopArtist = window.innerHeight;
        if (marginNewAlbums - innerHeightTopArtist < -50) {
          await this.getNewAlbums();
        }
      }
    },
    async getNewAlbums() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getAlbums,
        });
        const data = httpResponse?.data?.getAlbums || [];
        this.newAlbums = data;
      } catch (error) {
        ////
      }
    },
    playAllBestTracks() {
      this.$store.commit("player/setListsPlayer", this.listTracksBestInMonth);
    },
  },
};
</script>
