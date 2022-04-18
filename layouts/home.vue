<template>
  <div>
    <Header />
    <Navbar @onSearch="showSidebarSearch = !showSidebarSearch" />
    <nuxt />
    <Footer />
    <Search
      :show="showSidebarSearch"
      @close="showSidebarSearch = !showSidebarSearch"
    />
    <Player />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebarSearch: false,
    };
  },
};
</script>

<style>
</style>