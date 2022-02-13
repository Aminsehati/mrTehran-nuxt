<template>
  <div>
    <Header />
    <Navbar @onSearch="showSidebarSearch = !showSidebarSearch" />
    <nuxt />
    <Banner />
    <Footer />
    <Search :show="showSidebarSearch" />
    <Player/>
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