<template>
  <div
    :class="[
      'search-box',
      {
        show: show,
      },
    ]"
  >
    <div class="px-15 search_text-field">
      <TextField placeholder="Search....." search >
        <span class="back" slot="back" @click="$emit('close')">
          <i class="fa-solid fa-xmark"></i>
        </span>
      </TextField>
    </div>
  </div>
</template>

<script>
import "./style.scss";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>