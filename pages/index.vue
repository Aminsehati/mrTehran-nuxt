<template>
  <div class="home-page">
    <div class="container-sm">
      <Loading v-if="filters.loading" />
      <div v-else>
        <div class="top-play-list mb-30">
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
        <div class="top-artist-list">
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
import getActors from "@/graphql/queries/Actor/getActors";
export default {
  layout: "main",
  data() {
    return {
      listPlaylists: [],
      listActors: [],
      filters: {
        loading: false,
      },
    };
  },
  async fetch() {
    await this.getlistPlaylist();
    await this.getListActos();
  },
  methods: {
    async getlistPlaylist() {
      this.filters.loading = true;
      try {
        const httpResponse = await this.$apollo.query({
          query: getPlayList,
        });
        const data = httpResponse.data.getPlayLists;
        this.listPlaylists = data;
        this.filters.loading = false;
      } catch (error) {}
    },
    async getListActos() {
      this.filters.loading = true;
      try {
        const httpResponse = await this.$apollo.query({
          query: getActors,
        });
        const data = httpResponse.data.getActors;
        this.listActors = data;
        this.filters.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
