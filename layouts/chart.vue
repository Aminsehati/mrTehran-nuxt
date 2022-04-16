<template>
  <div>
    <Header />
    <Navbar @onSearch="showSidebarSearch = !showSidebarSearch" />
    <div class="container-sm">
      <Tabs :tabs="tabs" />
    </div>
    <nuxt />
    <Banner />
    <Footer />
    <Search
      :show="showSidebarSearch"
      @close="showSidebarSearch = !showSidebarSearch"
    />
    <Player />
  </div>
</template>

<script>
import tabs from "@/content/tabs";
export default {
  data() {
    return {
      showSidebarSearch: false,
      tabs,
    };
  },
};
</script>

<style>
</style>