<template>
  <div>
    <div v-if="error.statusCode === 404" class="page404">
      
    </div>
  </div>
</template>
<script>
export default {
  props: ["error"],
};
</script>
<style>
.page404{
    min-height: 100vh;
}
</style>