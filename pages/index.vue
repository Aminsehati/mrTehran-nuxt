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
            <nuxt-link to="/browse/latest" class="text-white">
              See All
              <i class="fa-solid fa-chevron-right ml-10 text-12"></i>
            </nuxt-link>
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
      <div class="best-of-month mb-30">
        <div class="container-sm">
          <div class="mb-20 flex justify-between items-center">
            <Title> Best of Month </Title>
            <nuxt-link to="/browse/popular" class="text-white">
              See All
              <i class="fa-solid fa-chevron-right ml-10 text-12"></i>
            </nuxt-link>
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
            <nuxt-link to="/artists" class="text-white">
              See All
              <i class="fa-solid fa-chevron-right ml-10 text-12"></i>
            </nuxt-link>
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
export default {
  layout: "home",
  data() {
    return {
      listPlaylists: [],
      listActors: [],
      listTracksBestInMonth: [],
      listTracksRecentlyAdded: [],
      filters: {
        loading: false,
      },
    };
  },
  async fetch() {
    await this.getlistTracksRecentlyAdded();
    await this.getListTracksInMonths();
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
    },
  },
};
</script>
