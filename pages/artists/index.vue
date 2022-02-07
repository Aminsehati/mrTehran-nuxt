<template>
  <div class="artists-page">
    <div class="container-sm">
      <div class="artist-wrapper grid xl:grid-cols-3 sm:grid-cols-2 gap-x-20 gap-y-20">
        <ArtistItem
          :ArtistInfo="artist"
          v-for="artist in listArtists"
          :key="artist.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listArtists: [
        {
          id: 1,
          name: "Masih & Arash",
          image: "https://cdnmrtehran.ir/media/artists/5f1d88b131ec5.jpg",
        },
      ],
    };
  },
  mounted() {
    for (let i = 0; i <= 12; i++) {
      this.listArtists.push({
        id: i + 1,
        name: "Masih & Arash",
        image: "https://cdnmrtehran.ir/media/artists/5f1d88b131ec5.jpg",
      });
    }
  },
};
</script>

<style>
</style>