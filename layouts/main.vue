<template>
  <div>
    <Header />
    <Navbar @onSearch="showSidebarSearch = !showSidebarSearch" />
    <nuxt />
    <Banner v-if="$route.fullPath !== '/'" />
    <Footer />
    <Search
      :show="showSidebarSearch"
      @close="showSidebarSearch = !showSidebarSearch"
    />
    <Player @showList="showSidebarPlayerLists = !showSidebarPlayerLists" />
    <PlayerLists
      :show="showSidebarPlayerLists"
      @close="showSidebarPlayerLists = !showSidebarPlayerLists"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebarSearch: false,
      showSidebarPlayerLists: false,
    };
  },
};
</script>

<style>
</style>