<template>
  <div>
    <div class="container-sm">
      <CoverArtist :ArtistInfo="ArtistInfo" />
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ArtistInfo:{
        title:"Shadmehr Aghili",
        coverImage:"https://cdnmrtehran.ir/media/artists/5c6edf5ad1baf.jpg"
      }
    }
  }
};
</script>

<style>
</style>