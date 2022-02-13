<template>
  <div class="home-page">
    <div class="container-sm">
      <div class="top-play-list mb-30">
        <div class="mb-20">
          <Title> Top Playlists </Title>
        </div>
        <div class="grid grid-cols-3 gap-x-15 gap-y-20">
          <PlayListItem
            :playListInfo="playlist"
            v-for="playlist in listPlaylists"
            :key="playlist.id"
          />
        </div>
      </div>
      <div class="top-artist-list">
        <div class="mb-20">
          <Title> Top Artists </Title>
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
</template>

<script>
import "./style.scss";
import getPlayList from "@/graphql/queries/playList/getPlayLists.gql";
import getActors from "@/graphql/queries/Actor/getActors";
export default {
  data() {
    return {
      listPlaylists: [],
      listActors: [],
    };
  },
  mounted() {
    this.getlistPlaylist();
    this.getListActos();
  },
  methods: {
    async getlistPlaylist() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getPlayList,
        });
        const data = httpResponse.data.getPlayLists;
        this.listPlaylists = data;
      } catch (error) {}
    },
    async getListActos() {
      try {
        const httpResponse = await this.$apollo.query({
          query: getActors,
        });
        const data = httpResponse.data.getActors;
        this.listActors = data;
      } catch (error) {}
    },
  },
};
</script>
