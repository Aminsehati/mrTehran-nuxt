<template>
  <div class="form-group">
    <input
      :type="type"
      :placeholder="placeholder"
      :class="[
        'form-control',
        {
          'has-search': search,
        },
      ]"
    />
    <span v-if="search" class="seach-icon">
      <i class="fa-solid fa-magnifying-glass"></i>
    </span>
    <slot name="back"/>
  </div>
</template>

<script>
import "./style.scss";
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    search: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>