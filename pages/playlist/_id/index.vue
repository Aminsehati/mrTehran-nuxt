<template>
  <div class="playlist-page">
      <div class="container-sm">
          <CoverPlayList :playListInfo="playListInfo"/>
      </div>
  </div>
</template>

<script>
import './style.scss'
export default {
    data(){
        return {
            playListInfo:{
                name:"Rap / Hip Hop",
                coverImage:"https://cdnmrtehran.ir/media/genremood/5e8769bcc5faa.jpg",
                countFollowers:0
            }
        }
    }
}
</script>

<style>

</style>