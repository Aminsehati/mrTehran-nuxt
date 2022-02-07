<template>
  <header class="header">
      <div class="logo_header">
          <img :src="logoIcon" class="mx-auto" alt="logo"/>
      </div>
  </header>
</template>

<script>
import './style.scss'
export default {
    data(){
        return {
            logoIcon : require('@/assets/Images/logo.png')
        }
    }
}
</script>

<style>

</style>