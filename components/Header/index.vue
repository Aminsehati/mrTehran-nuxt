<template>
  <header class="header">
      <div class="logo_header">
         <nuxt-link to="/">
              <img :src="logoIcon" class="mx-auto" alt="logo"/>
         </nuxt-link>
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