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
              <Button class="mr-15" secondary @onClick="playAllRecentlyTrack">
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
          <div
            class="
              grid
              gap-x-15
              lg:grid-cols-4
              sm:grid-cols-2
              xs:grid-cols-2
              grid-cols-1
              gap-y-20
            "
          >
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
// import PlayListService from "@/service/PlayList";
// import ArtistService from "@/service/Artist";
// import TrackService from "@/service/Track";
// import AlbumService from "@/service/Album";
import { AlbumService ,TrackService ,ArtistService ,PlayListService} from "@/service/index";
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
        const pagination = {
          limit: 6,
          skip: 1,
        };
        const httpRequest = await PlayListService.getPlayLists({ pagination });
        const httpResponse = httpRequest.getPlayLists;
        this.listPlaylists = httpResponse;
      } catch (error) {
        ///
      } finally {
      }
    },
    async getListActos() {
      try {
        const sort = {};
        const filter = {};
        const pagination = {
          limit: 12,
          skip: 1,
        };
        const httpRequest = await ArtistService.getArtists({
          pagination,
          sort,
          filter,
        });
        const httpResponse = httpRequest.getArtists;
        this.listActors = httpResponse;
      } catch (error) {
        ////
      } finally {
      }
    },
    async getListTracksInMonths() {
      try {
        const pagination = {
          limit: 12,
          skip: 1,
        };
        const sort = {};
        const filter = {};
        const httpRequest = await TrackService.getTracks({
          pagination,
          sort,
          filter,
        });
        const data = httpRequest?.getTracks || [];
        this.listTracksBestInMonth = data;
      } catch (error) {
        /////
      }
    },
    async getlistTracksRecentlyAdded() {
      try {
        const pagination = {
          limit: 6,
          skip: 1,
        };
        const sort = {
          createdAt: -1,
        };
        const filter = {};
        const httpRequest = await TrackService.getTracks({
          pagination,
          sort,
          filter,
        });
        const data = httpRequest?.getTracks || [];
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
        const pagination = {
          limit: 4,
          skip: 1,
        };
        const httpRequst = await AlbumService.getAlbums({ pagination });
        const data = httpRequst?.getAlbums || [];
        this.newAlbums = data;
      } catch (error) {
        ////
      }
    },
    playAllBestTracks() {
      this.$store.commit("player/setListsPlayer", this.listTracksBestInMonth);
    },
    playAllRecentlyTrack() {
      this.$store.commit("player/setListsPlayer", this.listTracksRecentlyAdded);
    },
  },
};
</script>
