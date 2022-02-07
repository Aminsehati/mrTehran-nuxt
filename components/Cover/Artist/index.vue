<template>
  <div class="cover-artist">
      {{
          ArtistInfo.coverImage
      }}
  </div>
</template>

<script>
import './style.scss'
export default {
    props:{
        ArtistInfo:{
            type:Object,
            default:()=>{}
        }
    }
}
</script>

<style>

</style>