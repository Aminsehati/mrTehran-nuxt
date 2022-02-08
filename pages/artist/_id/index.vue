<template>
  <div>
    <div class="container-sm">
      <CoverArtist :ArtistInfo="ArtistInfo" />
      <div class="title_ mb-30">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ArtistInfo: {
        title: "Shadmehr Aghili",
        coverImage: "https://cdnmrtehran.ir/media/artists/5c6edf5ad1baf.jpg",
        countFollowers: 25000,
      },
      listTracks: [],
    };
  },
  mounted() {
    for (let i = 0; i <= 22; i++) {
      this.listTracks.push({
        id: i + 1,
        Actor: "Shadmehr Aghili",
        nameTrack: "Dire",
        image:
          "https://cdnmrtehran.ir/media/mp3s/mohsen_yeganeh/mohsen_yeganeh_shahre_khakestari_thumb.jpg",
      });
    }
  },
};
</script>

<style>
</style>