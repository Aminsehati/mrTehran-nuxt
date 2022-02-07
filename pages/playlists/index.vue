<template>
  <div class="playlist-page">
    <div class="container-sm">
      <Title class="mb-20"> Exclusive Playlists </Title>
      <div
        class="
          playlist-wrapper
          grid
          xl:grid-cols-3
          sm:grid-cols-2
          gap-x-20 gap-y-20
        "
      >
        <PlayListItem
          v-for="playlist in playListsItems"
          :key="playlist.id"
          :playListInfo="playlist"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playListsItems: [
        {
          id: 1,
          name: "Turkish",
          image: "https://cdnmrtehran.ir/media/genremood/5e888a5436ec2.jpg",
        },
      ],
    };
  },
  mounted() {
    for (let i = 0; i <= 22; i++) {
      this.playListsItems.push({
        id: 1,
        name: "Turkish",
        image: "https://cdnmrtehran.ir/media/genremood/5e888a5436ec2.jpg",
      });
    }
  },
};
</script>

<style>
</style>